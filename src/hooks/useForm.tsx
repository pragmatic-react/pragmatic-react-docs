import { useActionState } from "react";

type SubmitHandler<T> = (values: T) => Promise<void> | void;

type UseFormProps<T> = {
  handleSubmit: SubmitHandler<T>;
};

const initAction = () => {};

export default function useForm<T extends Record<string, any>>({
  handleSubmit,
}: UseFormProps<T>) {
  async function onSubmit(_: any, formData: FormData) {
    const values = Object.fromEntries(formData.entries()) as T;

    try {
      await handleSubmit(values);
    } catch (e) {
      console.error(e);
    }

    return initAction; // 상태 갱신 안 할 경우
  }

  const [_, formAction, isPending] = useActionState(onSubmit, initAction);

  return { formAction, isPending };
}
