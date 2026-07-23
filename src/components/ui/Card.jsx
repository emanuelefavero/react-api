import { cx } from '@/lib/utils';
import './Card.css';

export const Card = ({ as: Component = 'div', className, ...props }) => (
  <Component className={cx('card', className)} {...props} />
);
