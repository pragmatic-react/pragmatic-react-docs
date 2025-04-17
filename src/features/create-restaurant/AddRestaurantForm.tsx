import useAddRestaurant from "../../hooks/useAddRestaurant";
import CategoryOption from "./Form/CategoryOption";
import Title from "./Form/Title";
import Description from "./Form/Description";
import Form from "../../shared/ui/Form";

const AddRestaurantForm = ({ onClose }) => {
  const { addRestaurant } = useAddRestaurant();

  const onSubmit = async (data: typeof values) => {
    try {
      await addRestaurant(data);
    } catch (e) {
      console.error(e);
    }
    onClose();
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialStep={"name"}
      totalSteps={["name", "category", "description"]}
    >
      <Form.Item
        step="category"
        labelName="카테고리"
        nextStep="description"
        validation={[(v) => (!v ? "카테고리를 선택해 주세요." : null)]}
      >
        {(props) => <CategoryOption {...props} />}
      </Form.Item>
      <Form.Item
        step="name"
        nextStep="category"
        labelName="이름"
        validation={[
          (v) => (!v.trim() ? "이름을 입력해 주세요." : null),
          (v) => (v.length < 2 ? "이름은 2자 이상이어야 합니다." : null),
        ]}
      >
        {(props) => <Title {...props} />}
      </Form.Item>
      <Form.Item
        step="description"
        labelName="설명"
        validation={[
          (v) => (v.length < 1 ? "설명을 추가해주세요" : null),
          (v) => (v.length > 200 ? "설명은 200자 이내로 입력해 주세요." : null),
        ]}
      >
        {(props) => <Description {...props} />}
      </Form.Item>
      <Form.Submit>
        {(props) => (
          <div className="button-container">
            <button
              className={`button ${
                props.hasError ? "" : "button--primary"
              } text-caption`}
              disabled={props.hasError ? true : false}
              onClick={props.onSubmit}
              type="submit"
            >
              추가하기
            </button>
          </div>
        )}
      </Form.Submit>
    </Form>
  );
};

export default AddRestaurantForm;
