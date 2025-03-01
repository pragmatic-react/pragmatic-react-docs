import { useModal } from '@features/modal';

import { Restaurant, RestaurantIcon } from '@entities/restaurant';

import { Drawer } from '@shared/ui';

type Props = {
  selected: Restaurant | null;
};

const Inner = (props: Restaurant) => {
  const { description, name, category } = props;

  return (
    <div className="flex flex-col gap-4">
      <RestaurantIcon category={category} name={name} />

      <h2 className="text-xl font-semibold">{name}</h2>

      <p>{description}</p>
    </div>
  );
};
export const RestaurantDetailDrawer = ({ selected }: Props) => {
  const { isOpen, closeModal } = useModal();

  return (
    <Drawer isOpen={isOpen} onClose={closeModal}>
      {selected && <Inner {...selected} />}
    </Drawer>
  );
};
