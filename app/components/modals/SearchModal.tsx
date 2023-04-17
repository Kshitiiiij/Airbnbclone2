"use client";

import Modal from "./Modal";
import useSearchModal from "../../hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../input/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calander from "../input/Calander";
import Counter from "../input/Counter";

enum STEP {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [locationValue, setLocationValue] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEP.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRnage] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEP.INFO) return onNext();

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
      const updatedQuery: any = {
        ...currentQuery,
        locationValue: locationValue?.value,
        guestCount,
        roomCount,
        bathroomCount,
      };

      if (dateRange.startDate) {
        updatedQuery.startDate = formatISO(dateRange.startDate);
      }
      if (dateRange.endDate) {
        updatedQuery.endDate = formatISO(dateRange.endDate);
      }

      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      setStep(STEP.LOCATION);
      searchModal.onClose();
      router.push(url);
    }
  }, [
    step,
    searchModal,
    onNext,
    params,
    router,
    locationValue,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEP.INFO) return "Search";
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEP.LOCATION) return undefined;
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where are you going?"
        subtitle="Find the perfect place to stay"
      />
      <CountrySelect
        value={locationValue}
        onChange={(value) => setLocationValue(value as CountrySelectValue)}
      />
      <hr />
      <div className="">
        <Map center={locationValue?.latlng} />
      </div>
    </div>
  );

  if (step === STEP.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everone is free :p"
        />

        <Calander
          value={dateRange}
          onChange={(value) => setDateRnage(value.selection)}
        />
      </div>
    );
  }

  if (step === STEP.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place" />
        <Counter
          title="Guest"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathroom"
          subtitle="How bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }
  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filers"
      actionLabel={actionLabel}
      secondaryAction={step === STEP.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default SearchModal;
