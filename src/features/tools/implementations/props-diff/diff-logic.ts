export interface DiffItem {
  key: string;
  status: "added" | "removed" | "changed" | "unchanged";
  beforeValue: string;
  afterValue: string;
  type: string;
}

export interface PropsDiffResult {
  diffs: DiffItem[];
  memoizationSuggestions: string[];
}

export function analyzePropsDiff(beforeStr: string, afterStr: string, language: "en" | "ko" = "en"): PropsDiffResult {
  if (!beforeStr.trim() || !afterStr.trim()) {
    return { diffs: [], memoizationSuggestions: [] };
  }

  let before: Record<string, unknown>;
  let after: Record<string, unknown>;

  try {
    const parsedBefore = JSON.parse(beforeStr);
    const parsedAfter = JSON.parse(afterStr);
    
    if (typeof parsedBefore !== "object" || parsedBefore === null || Array.isArray(parsedBefore) ||
        typeof parsedAfter !== "object" || parsedAfter === null || Array.isArray(parsedAfter)) {
      throw new Error(
        language === "ko" ? "Props는 유효한 JSON 객체여야 합니다." : "Props must be valid JSON objects."
      );
    }
    
    before = parsedBefore as Record<string, unknown>;
    after = parsedAfter as Record<string, unknown>;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(
        language === "ko"
          ? `JSON 파싱 에러: ${err.message}`
          : `JSON Parsing Error: ${err.message}`
      );
    }
    throw new Error(
      language === "ko"
        ? "Props를 파싱하지 못했습니다. 두 입력값이 모두 유효한 JSON 객체인지 확인하세요."
        : "Failed to parse props. Ensure both inputs are valid JSON objects."
    );
  }

  const allKeys = Array.from(new Set([...Object.keys(before), ...Object.keys(after)]));
  const diffs: DiffItem[] = [];
  const memoizationSuggestions: string[] = [];

  let referenceTypeChanges = 0;

  for (const key of allKeys) {
    const hasBefore = key in before;
    const hasAfter = key in after;
    const valBefore = before[key];
    const valAfter = after[key];

    const typeBefore = hasBefore ? typeof valBefore : "undefined";
    const typeAfter = hasAfter ? typeof valAfter : "undefined";
    const currentType = hasAfter ? typeAfter : typeBefore;

    const isRefType = typeof valAfter === "object" && valAfter !== null;

    if (hasBefore && !hasAfter) {
      diffs.push({
        key,
        status: "removed",
        beforeValue: JSON.stringify(valBefore),
        afterValue: "undefined",
        type: typeBefore,
      });
    } else if (!hasBefore && hasAfter) {
      diffs.push({
        key,
        status: "added",
        beforeValue: "undefined",
        afterValue: JSON.stringify(valAfter),
        type: typeAfter,
      });
      if (isRefType) {
        memoizationSuggestions.push(
          language === "ko"
            ? `'${key}' Prop(객체/배열)이 새로 추가되었습니다. 참조 타입 Prop은 부모 컴포넌트에서 React.useMemo()나 React.useCallback()을 통해 참조를 안정화해야 React.memo가 깨지는 것을 방지할 수 있습니다.`
            : `Prop '${key}' (object/array) is newly added. Non-primitive props require React.useMemo() or React.useCallback() on the parent component to avoid breaking React.memo.`
        );
      }
    } else {
      const isUnchanged = JSON.stringify(valBefore) === JSON.stringify(valAfter);
      
      if (isUnchanged) {
        diffs.push({
          key,
          status: "unchanged",
          beforeValue: JSON.stringify(valBefore),
          afterValue: JSON.stringify(valAfter),
          type: currentType,
        });
      } else {
        diffs.push({
          key,
          status: "changed",
          beforeValue: JSON.stringify(valBefore),
          afterValue: JSON.stringify(valAfter),
          type: currentType,
        });

        if (isRefType) {
          referenceTypeChanges++;
        }
      }
    }
  }

  // Memoization Suggestions General Analysis
  if (referenceTypeChanges > 0) {
    memoizationSuggestions.push(
      language === "ko"
        ? `참조 타입 Prop(객체/배열)에서 ${referenceTypeChanges}개의 변경사항이 감지되었습니다. 이 컴포넌트가 React.memo를 사용한다면, 부모 컴포넌트에서 제공하는 참조가 안정적인지 확인하거나(예: useMemo/useState), React.memo의 두 번째 매개변수로 커스텀 비교 함수를 전달해 참조 안정성을 보완해야 합니다.`
        : `Detected ${referenceTypeChanges} changes in reference-type props (objects/arrays). If this component relies on React.memo, ensure parent references are stable (e.g., via useMemo/useState) or use a custom comparison function as React.memo's second parameter.`
    );
  }

  const unstableKeys = diffs
    .filter((d) => d.status === "changed" && typeof JSON.parse(d.afterValue) === "object")
    .map((d) => d.key);

  if (unstableKeys.length > 0) {
    memoizationSuggestions.push(
      language === "ko"
        ? `불안정한 참조 Prop 감지: [${unstableKeys.join(", ")}]. 깊은 비교 결과 컨텐츠가 변경되었습니다. 만약 이 값들이 부모 렌더링 시점에 인라인 리터럴로 생성되는 경우, 매 프레임마다 리렌더링을 유발할 수 있습니다.`
        : `Unstable reference props identified: [${unstableKeys.join(", ")}]. Deep equality comparison shows they changed content. If they were inline values in the parent render, they will trigger render execution on every frame.`
    );
  }

  if (diffs.every((d) => d.status === "unchanged") && diffs.length > 0) {
    memoizationSuggestions.push(
      language === "ko"
        ? "모든 Prop이 동일합니다 (얕은 비교 및 깊은 비교 모두 일치). React.memo가 이 입력값에 대한 불필요한 리렌더링을 성공적으로 방지할 것입니다."
        : "All props are identical (shallow & deep comparison). React.memo will successfully prevent re-render for these inputs."
    );
  }

  return { diffs, memoizationSuggestions };
}
