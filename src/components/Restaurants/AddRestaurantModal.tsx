import { Modal, ModalContextType } from "../../UI/Modal";
import useAddRestaurant from "../../hooks/useAddRestaurant";
import { useForm } from "../../hooks/useForm";
import useForm2 from "../../hooks/useForm2";
import { Restaurant as RestaurantType } from "../../models";
import CategoryOption from "../Form/CategoryOption";
import Title from "../Form/Title";
import Description from "../Form/Description";

export type RestaurantModalData = Pick<RestaurantType, "name" | "description">;

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

  const [Form] = useForm2({
    onSubmit,
  });

  return (
    <Form>
      <Form.Item
        name="category"
        nextName="title"
        validation={[(v) => (!v ? "카테고리를 선택해 주세요." : null)]}
      >
        {(props) => <CategoryOption {...props} />}
      </Form.Item>
      <Form.Item
        name="title"
        validation={[
          (v) => (!v.trim() ? "이름을 입력해 주세요." : null),
          (v) => (v.length < 2 ? "이름은 2자 이상이어야 합니다." : null),
        ]}
      >
        {(props) => <Title {...props} />}
      </Form.Item>
      <Form.Item
        name="description"
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
            >
              추가하기
            </button>
          </div>
        )}
      </Form.Submit>
    </Form>
  );
};

const AddRestaurantModal = ({ isOpen, onClose }: ModalContextType) => {
  return (
    <Modal title="새로운 음식점" isOpen={isOpen} onClose={onClose}>
      <Modal.Title />
      <AddRestaurantForm onClose={onClose} />
      {/* <Modal.CloseButton /> */}
    </Modal>
  );
};

export default AddRestaurantModal;
