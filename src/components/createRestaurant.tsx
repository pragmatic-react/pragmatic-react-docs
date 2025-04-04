import { PropsWithChildren, useReducer, useRef, useState } from "react";
import RestaurantService from "../services/restaurantApi";
import { RestaurantItemType } from "../services/restaurantIType";
import useForm from "../hooks/useForm";

type formType = RestaurantItemType;

const stepInfo = {
  first: 0,
  last: 2,
};

export default function CreateRestaurant({
  closeModal,
  refetch,
}: {
  closeModal: () => void;
  refetch: () => Promise<void>;
}) {
  /* ---------------------------------- Form ---------------------------------- */
  async function handleSubmit(values: formType) {
    try {
      await RestaurantService.CreateInfo({
        data: {
          id: Date.now(),
          ...values,
        },
      });

      await refetch();
      closeModal();
    } catch (e) {
      window.alert("예기치못한 에러가 발생했습니다.");
      console.error(e);
    }
  }

  const { formAction, isPending } = useForm({
    handleSubmit,
  });

  /* --------------------------------- Switch --------------------------------- */

  const [currentStep, setCurrentStep] = useReducer((pre, next) => {
    // 이전 버튼 클릭 시
    if (next === "pre") {
      if (pre === stepInfo.first) {
        return 2;
      } else {
        return pre - 1;
      }

      // 다음 버튼 클릭 시
    } else {
      if (pre === stepInfo.last) {
        return 0;
      } else {
        return pre + 1;
      }
    }
  }, 0);

  return (
    <form action={formAction}>
      {/* Switch */}
      <div>
        <button onClick={() => setCurrentStep("pre")}>{"<"}</button>
        <button onClick={() => setCurrentStep("next")}>{">"}</button>
      </div>

      <StepContent currentStep={currentStep} step={0}>
        <StepOne />
      </StepContent>
      <StepContent currentStep={currentStep} step={1}>
        <StepTwo />
      </StepContent>

      {/* Last step */}
      <StepContent currentStep={currentStep} step={2}>
        <div className="button-container">
          <button
            type="button"
            className="button button--secondary text-caption"
            onClick={() => {
              closeModal();
            }}
            disabled={isPending}
          >
            취소하기
          </button>
          <button
            type="submit"
            className="button button--primary text-caption"
            disabled={isPending}
          >
            {isPending ? "추가중..." : "추가하기"}
          </button>
        </div>
      </StepContent>
    </form>
  );
}

type StepContentProps = { currentStep: number; step: number };
function StepContent({
  currentStep,
  step,
  children,
}: PropsWithChildren<StepContentProps>) {
  return (
    <div style={{ display: step === currentStep ? "block" : "none" }}>
      {children}
    </div>
  );
}

function StepOne() {
  const name = useRef("");
  const description = useRef("");

  return (
    <>
      {/* 이름 */}
      <div className="form-item form-item--required">
        <label htmlFor="name" className="text-caption">
          이름
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required
          onBlur={(e) => {
            name.current = e.target.value;
          }}
        />
      </div>

      {/* 설명 */}
      <div className="form-item">
        <label htmlFor="description" className="text-caption">
          설명
        </label>
        <textarea
          name="description"
          id="description"
          cols={30}
          rows={5}
          onBlur={(e) => {
            description.current = e.target.value;
          }}
        ></textarea>
        <span className="help-text text-caption">
          메뉴 등 추가 정보를 입력해 주세요.
        </span>
      </div>
    </>
  );
}

function StepTwo() {
  const category = useRef("");

  return (
    <div className="form-item form-item--required">
      <label htmlFor="category" className="text-caption">
        카테고리
      </label>
      <select
        name="category"
        id="category"
        required
        onChange={(e) => {
          category.current = e.target.value;
        }}
      >
        <option value="">선택해 주세요</option>
        <option value="한식">한식</option>
        <option value="중식">중식</option>
        <option value="양식">양식</option>
        <option value="아시안">아시안</option>
        <option value="기타">기타</option>
      </select>
    </div>
  );
}
