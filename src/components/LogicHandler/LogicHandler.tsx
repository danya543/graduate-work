import { useLogicHandler } from '@hooks/useLogicHandler';
import { LogicHandlerProps, LogicHandlerRef } from '@src/types/LogicHandler';
import { RootState } from '@store/store';
import { forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const LogicHandler = forwardRef<LogicHandlerRef, LogicHandlerProps>(
  ({ onStepChange, initialStep = 0 }, ref) => {
    const dispatch = useDispatch();
    const storage = useSelector((state: RootState) => state.storage);
    const signals = useSelector((state: RootState) => state.signals);

    const { handleNext, restart, getCurrentStep } = useLogicHandler(
      signals,
      dispatch,
      storage,
      initialStep,
      onStepChange,
    );

    useImperativeHandle(ref, () => ({
      handleNext,
      getCurrentStep,
      restart,
    }));

    return null;
  },
);

LogicHandler.displayName = 'LogicHandler';
