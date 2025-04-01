import {
  useRef,
  useState,
  ReactNode,
  useCallback,
  createRef,
  useEffect,
} from "react";

interface FormValues {
  [key: string]: any;
}
interface FormRefs {
  [key: string]: React.RefObject<any>;
}

function useForm2({ onSubmit }) {
  const formRefs = useRef<FormRefs>({});
  const formErrors = useRef<FormValues>({});
  // const [, setRerender] = useState(0); // 강제로 re-render를 위한 state
  // const forceUpdate = () => setRerender((prev) => prev + 1);
  const errorListeners = useRef<(() => void)[]>([]);

  const notifyErrorListeners = () => {
    errorListeners.current.forEach((callback) => callback());
  };

  const FormItem = ({
    children,
    name,
    nextName,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    required,
    disabled,
    validation,
  }) => {
    const [error, setError] = useState();

    // ref 초기화는 컴포넌트 최초 마운트시 한번만
    if (!formRefs.current[name]) {
      formRefs.current[name] = createRef();
    }

    const validate = (value) => {
      const result = validation?.map((v) => {
        return v(value);
      });

      return result.find((v) => v != null && v != undefined);
    };

    const handleChange = (e) => {
      //validation 체크
      const errorMessage = validate(formRefs.current[name].current.value);
      setError(errorMessage);
      formErrors.current[name] = errorMessage;

      notifyErrorListeners();

      // 다음 input으로 포커스 이동
      if (nextName) {
        formRefs.current[nextName].current?.focus();
      }
    };

    return children({
      ref: formRefs.current[name],
      onChange: handleChange,
      onBlur: handleChange,
      name: name,
      min: min,
      max: max,
      maxLength: maxLength,
      minLength: minLength,
      pattern: pattern,
      required: required,
      disabled: disabled,
      error: error,
    });
  };

  const FormSubmit = ({ children }) => {
    const [hasError, setHasError] = useState(true);

    const checkErrors = () => {
      const hasAny = Object.values(formErrors.current).some(Boolean);
      setHasError(hasAny);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const hasError = Object.values(formErrors.current).some(Boolean);
      if (hasError) {
        console.warn("폼에 에러 있음!", formErrors.current);
      } else {
        const values = Object.entries(formRefs.current).reduce(
          (acc, [key, ref]) => {
            acc[key] = ref.current?.value;
            return acc;
          },
          {}
        );
        onSubmit(values);
      }
    };

    useEffect(() => {
      errorListeners.current.push(checkErrors);
      return () => {
        errorListeners.current = errorListeners.current.filter(
          (cb) => cb !== checkErrors
        );
      };
    }, []);
    return <>{children({ onSubmit: handleSubmit, hasError })}</>;
  };

  const Form = ({ children }) => {
    // useEffect(() => {}, [currentType]);

    return <form>{children}</form>;
  };

  Form.Item = FormItem;
  Form.Submit = FormSubmit;

  return [Form];
}

export default useForm2;
