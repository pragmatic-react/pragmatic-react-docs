import {
  createContext,
  useState,
  useContext,
  useRef,
  createRef,
  useEffect,
} from "react";

const FormContext = createContext(null);

export function Form({ children, onSubmit }) {
  const [formErrors, setFormErrors] = useState({
    category: true,
    name: true,
    description: true,
  });
  const formRefs = useRef({});

  return (
    <form>
      <FormContext.Provider
        value={{ formErrors, setFormErrors, formRefs, onSubmit }}
      >
        {children}
      </FormContext.Provider>
    </form>
  );
}

export function FormItem({ children, name, nextName, validation }) {
  const [error, setError] = useState();
  const { setFormErrors, formRefs } = useContext(FormContext);

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
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

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
    error: error,
  });
}

const FormSubmit = ({ children }) => {
  const { formErrors, formRefs, onSubmit } = useContext(FormContext);
  const [hasError, setHasError] = useState(true);

  useEffect(() => {
    const hasError = Object.values(formErrors).some(Boolean);
    setHasError(hasError);
  }, [formErrors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasError = Object.values(formErrors).some(Boolean);
    if (hasError) {
      console.warn("폼에 에러 있음!", formErrors);
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

  return <>{children({ onSubmit: handleSubmit, hasError })}</>;
};

Form.Submit = FormSubmit;
Form.Item = FormItem;

export default Form;
