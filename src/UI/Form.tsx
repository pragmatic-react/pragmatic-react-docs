import {
  createContext,
  useState,
  useContext,
  useRef,
  createRef,
  useEffect,
} from "react";

const FormContext = createContext(null);

export function Form({ children, onSubmit, initialStep, totalSteps }) {
  const formRef = useRef(null);
  const [formStep, setFormStep] = useState(initialStep);
  const [formErrors, setFormErrors] = useState(
    totalSteps?.reduce((prev, step) => {
      prev[step] = true;
      return prev;
    }, {})
  );
  const formItemRefs = useRef({});

  return (
    <form ref={formRef}>
      <FormContext.Provider
        value={{
          formErrors,
          setFormErrors,
          formItemRefs,
          onSubmit,
          formRef,
          formStep,
          setFormStep,
          totalSteps,
          initialStep,
        }}
      >
        {children}
      </FormContext.Provider>
    </form>
  );
}

export function FormItem({ children, step, nextStep, validation, labelName }) {
  const validate = (value) => {
    if (!value) return false;
    const result = validation?.map((v) => {
      return v(value);
    });

    return result.find((v) => v != null && v != undefined);
  };

  const { setFormErrors, formItemRefs, formStep, setFormStep, totalSteps } =
    useContext(FormContext);

  const [error, setError] = useState(
    (validate(formItemRefs.current?.[step]?.value) ? false : true) || true
  );

  // ref 초기화는 컴포넌트 최초 마운트시 한번만
  if (!formItemRefs.current[step]) {
    formItemRefs.current[step] = {
      ref: createRef(),
      value: "",
    };
  }

  const handleChange = (e) => {
    const errorMessage = validate(formItemRefs.current[step].ref.current.value);
    // formstep을 변경하여도 이전 작성 내용을 기억하기 위함.
    formItemRefs.current[step].value =
      formItemRefs.current[step].ref.current.value;
    setError(errorMessage);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [step]: errorMessage ? true : false,
    }));
  };

  const onClickNext = () => {
    setFormStep(nextStep);
  };

  useEffect(() => {
    if (step === formStep) {
      formItemRefs.current[formStep].ref?.current.focus();
    }
  }, [formStep]);

  return (
    step === formStep && (
      <div className="form-item">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "flex-start",
          }}
        >
          {totalSteps.map((otherStep) => {
            if (otherStep != step) {
              return (
                <div
                  onClick={() => {
                    if (error) {
                      return;
                    }
                    setFormStep(otherStep);
                  }}
                  style={{ color: error ? "grey" : "black" }}
                >
                  {otherStep}
                </div>
              );
            } else {
              return <label htmlFor={step}>{labelName}</label>;
            }
          })}
        </div>
        {children({
          ref: formItemRefs.current[step],
          onChange: handleChange,
          onBlur: handleChange,
          step: step,
          error: error,
        })}
        {nextStep && (
          <div className="button-container">
            <button
              type="button"
              className={`button ${
                error ? "" : "button--primary"
              } text-caption`}
              disabled={error ? true : false}
              onClick={onClickNext}
            >
              다음
            </button>
          </div>
        )}
      </div>
    )
  );
}

const FormSubmit = ({ children }) => {
  const { formErrors, formItemRefs, onSubmit } = useContext(FormContext);
  const [hasError, setHasError] = useState(true);

  useEffect(() => {
    const hasError = Object.values(formErrors).some(Boolean);
    setHasError(hasError);
  }, [formErrors]);

  const handleSubmit = () => {
    const hasError = Object.values(formErrors).some(Boolean);
    if (hasError) {
      console.warn("폼에 에러 있음!", formErrors);
    } else {
      const values = Object.entries(formItemRefs.current).reduce(
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
