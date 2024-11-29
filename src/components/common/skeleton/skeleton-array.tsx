import React, {ReactElement} from 'react';
import {SkeletonItem} from '@src/components';

type Props = {
  length: number;
  component: ReactElement;
};
export default function SkeletonArray({length, component}: Props) {
  return (
    <>
      {new Array(length).fill(component).map((value, idx) => (
        <SkeletonItem key={`${idx}`}>{value}</SkeletonItem>
      ))}
    </>
  );
}
