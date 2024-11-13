import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPhoto } from "../../api/pexelsApi/pexelsApi";
import {
  AverageColor,
  BackButton,
  ColorSwatch,
  Content,
  DetailContainer,
  Dimensions,
  ErrorMessage,
  ImageWrapper,
  Image,
  Info,
  PageWrapper,
  Photographer,
  PhotoLink,
  Title,
  SkeletonDetailsImage,
} from "./DetalsPage.styles";

import { PexelsPhoto } from "../../api/pexelsApi/pexelsInterfaces";

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState<PexelsPhoto>();
  const [error, setError] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPhoto(id)
        .then(setPhoto)
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  if (!photo) {
    return <></>;
  }
  const maxWidth = 1200;
  const width = Math.min(photo.width, maxWidth);
  const aspectRatio = photo.height / photo.width;
  const height = width * aspectRatio;

  return (
    <PageWrapper>
      <DetailContainer>
        <BackButton onClick={() => navigate("/")}>← Back to Home</BackButton>
        <Content>
          <ImageWrapper width={width} height={height}>
            {loadingImage && <SkeletonDetailsImage avgColor={photo.avg_color}/>}
            <Image
              src={photo.src.large}
              alt={photo.alt}
              style={{ display: loadingImage ? "none" : "block" }}
              onLoad={() => setLoadingImage(false)}
            />
          </ImageWrapper>
          <Info>
            <Title>{photo.alt}</Title>
            <Photographer>
              Photo by:{" "}
              <a href={photo.photographer_url} target="_blank" aria-label={`${photo.photographer}'s profile (opens in a new tab)`}>
                {photo.photographer}
              </a>
            </Photographer>
            <Dimensions>
              Dimensions: {photo.width} x {photo.height}
            </Dimensions>
            <AverageColor>
              Average Color: <ColorSwatch color={photo.avg_color} />
            </AverageColor>
            <PhotoLink href={photo.url} target="_blank"  aria-label="View on Pexels (opens in a new tab)">
              View on Pexels
            </PhotoLink>
          </Info>
        </Content>
      </DetailContainer>
    </PageWrapper>
  );
};

export default PhotoDetail;
