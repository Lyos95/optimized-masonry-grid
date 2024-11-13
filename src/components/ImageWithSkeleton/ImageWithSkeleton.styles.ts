import styled from 'styled-components';
import { PhotoCardProps } from '../VirtualizedColumn/virtualizedColumnInterfaces';

export const Column = styled.div`
  width: 100%;
  position: relative;
`;

export const PhotoImage = styled.img<PhotoCardProps>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease;
  position: absolute;
  top: ${({ top }) => top}px;
  height: ${({ height }) => height}px;

  &:hover {
    transform: scale(1.02);
  }
`;
interface PhotoCardSkeletonProps extends PhotoCardProps {
    avgColor: string;
}

export const Skeleton = styled.div<PhotoCardSkeletonProps>`
  background-color: #e0e0e0;
  position: absolute;
  top: ${({ top }) => top}px;
  height: ${({ height }) => height}px;
  background-color: ${({ avgColor }) => avgColor};
  width: 100%;
  border-radius: 10px;
`;
