import React from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import FlexBasisFull from '../components/FlexBasisFull';
import Header from '../components/Header';
import { useFetchObject } from '../hooks/useFetchRequest';
import { fetchSpray } from '../utilities/fetchSprays';
import Subheader from '../components/Subheader';

const IndividualSpray = () => {
  const { sprayName } = useParams();
  const sprayData = useFetchObject(fetchSpray, sprayName);

  if (!sprayData) {
    return null; // Don't try to render content until the fetch has completed
  }

  return (
    <>
        <div className="flex items-center justify-center">
          <BackButton />
          <Header text={sprayData.displayName} />
        </div>
        <FlexBasisFull />
        <div className="flex flex-wrap justify-center w-full">
          <section className="w-full lg:w-1/2 flex flex-wrap justify-center">
            <Subheader text="Full Spray" />
            <FlexBasisFull />
            <div className={`max-w-[95%] w-[512px] my-8`}>
              <img
                src={sprayData.fullTransparentIcon}
                alt={`${sprayData.displayName} Full Image`}
                className="object-contain w-full"
              />
            </div>
          </section>

          <section className="w-full lg:w-1/2 flex flex-wrap justify-center">
            <Subheader text="Icon" />
            <FlexBasisFull />
            <div className={`max-w-[95vw] w-[128px] my-8`}>
              <img
                src={sprayData.displayIcon}
                alt={`${sprayData.displayName} Icon`}
                className="object-contain w-full"
              />
            </div>
          </section>
          <FlexBasisFull />
        </div>
        <FlexBasisFull />
    </>
  );
};

export default IndividualSpray;
