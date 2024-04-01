import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import OverlayContent from "./OverlayContent";
import markerImage from "../img/marker.png";
import { useList } from "../hooks/useList";

const StyledMap = styled(Map)`
  z-index: 0;
  height: 100vh;
  width: 100vw;
  position: absolute;
  overflow: hidden;
`;
const StyledCustomOverlayMap = styled(CustomOverlayMap)`
  position: relative;
  //z-index: 0;
`;

export default function BasicMap({ lat, lng, mearidata }) {
  const { mearilist } = useList(mearidata.data?.data);
  const reverse = [...mearilist].reverse();
  return (
    <StyledMap
      id="map"
      center={{
        // 지도의 중심좌표
        lat: lat ? lat : 33.450701,
        lng: lng ? lng : 126.570667,
      }}
      level={3} // 지도의 확대 레벨
      //zoomable={false}
    >
      <MapMarker
        position={{
          lat: lat,
          lng: lng,
        }}
        image={{
          src: markerImage,
          size: {
            width: 78,
            height: 78,
          },
        }}
      ></MapMarker>
      {reverse.map((item, index) => {
        return (
          <StyledCustomOverlayMap
            key={index}
            position={{
              lat: item?.latitude,
              lng: item?.longitude,
            }}
          >
            <OverlayContent content={item?.content} />
          </StyledCustomOverlayMap>
        );
      })}
    </StyledMap>
  );
}
