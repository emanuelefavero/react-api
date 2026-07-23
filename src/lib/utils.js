// Joins classNames and removes falsy values: cx('a', true && 'b') === 'a b'
export const cx = (...classes) => classes.filter(Boolean).join(' ');
