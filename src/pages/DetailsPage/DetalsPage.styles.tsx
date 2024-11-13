import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background-color: #f0f0f0;
  overflow-x: hidden;
  @media (max-width: 768px) {
    min-width: 96vw;
  }
`;

export const DetailContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 80vh;
  @media (max-width: 768px) {
    padding: 15px;
    height: 100vh;
  }
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #0066ff;
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ImageWrapper = styled.div<{ width: number; height: number }>`
  flex: 1;
  max-width: 100%;
  width: 100%;
  max-height: 600px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  aspect-ratio: ${({ width, height }) => width / height};
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  border-radius: 8px;
  object-fit: scale-down;

  @media (max-width: 768px) {
    object-fit: scale-down;
  }
`;

export const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 300px;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Photographer = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 0;
  a {
    color: #0066ff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Dimensions = styled.p`
  line-height: 0;
  font-size: 14px;
  color: #777;
`;

export const AverageColor = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ColorSwatch = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color || "#ccc"};
  border-radius: 50%;
  border: 1px solid #ddd;
`;

export const PhotoLink = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: #0066ff;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
  &:hover {
    background-color: #0056b3;
    color: #f7f7f7;
  }

  @media (max-width: 768px) {
    padding: 10px 0;
    margin: 0;
  }
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;

interface SkeletonDetailsImageProps {
  avgColor?: string;
}

export const SkeletonDetailsImage = styled.div<SkeletonDetailsImageProps>`
  width: 100%;
  height: auto;
  max-width: 100%;
  border-radius: 8px;
  background-color: ${(props) => props.avgColor || "#ccc"};
  display: block;
`;
