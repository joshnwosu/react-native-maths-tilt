import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Animated, Easing, GestureResponderEvent } from 'react-native';
import GamePadStyle from './GamePadStyle';

interface AxisPadProps {
  size?: number;
  handlerSize?: number;
  step?: number;
  onValue?: (value: { x: number; y: number }) => void;
  autoCenter?: boolean;
  lockX?: boolean;
  lockY?: boolean;
  resetOnRelease?: boolean;
  wrapperStyle?: any;
  handlerStyle?: any;
  children?: React.ReactNode;
}

const GamePad: React.FC<AxisPadProps> = ({
  size = 300,
  handlerSize = 100,
  step = 0,
  onValue,
  autoCenter,
  lockX,
  lockY,
  resetOnRelease,
  wrapperStyle,
  handlerStyle,
  children,
}) => {
  const [identifier, setIdentifier] = useState<number | null>(null);
  const [state, setState] = useState({
    cx: 0,
    cy: 0,
    sx: 0,
    sy: 0,
    px: 0,
    py: 0,
    dx: 0,
    dy: 0,
    width: size,
    handler: handlerSize,
    step: step,
  });

  const anim_cx = useRef(new Animated.Value(0)).current;
  const anim_cy = useRef(new Animated.Value(0)).current;
  const anim_px = useRef(new Animated.Value(0)).current;
  const anim_py = useRef(new Animated.Value(0)).current;

  const wrapperElement = useRef<any>(null);
  const handlerElement = useRef<any>(null);

  const centerAnimate = useCallback(() => {
    Animated.timing(anim_cx, {
      toValue: state.cx,
      duration: 300,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();

    Animated.timing(anim_cy, {
      toValue: state.cy,
      duration: 300,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
  }, [anim_cx, anim_cy, state.cx, state.cy]);

  const animate = useCallback(() => {
    Animated.timing(anim_px, {
      toValue: state.px,
      duration: 50,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();

    Animated.timing(anim_py, {
      toValue: state.py,
      duration: 50,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [anim_px, anim_py, state.px, state.py]);

  const limitter = useCallback(
    (input: number): number => {
      const minimised = (input / state.width) * 2;
      const stepped = step ? Math.floor(minimised / step) * step : minimised;
      const limited = Math.min(1, Math.max(-1, stepped));
      return (limited * state.width) / 2;
    },
    [state.width, step]
  );

  const sendValue = useCallback(
    (x: number, y: number) => {
      onValue?.({ x: (x / state.width) * 2, y: (y / state.width) * 2 });
    },
    [onValue, state.width]
  );

  const centerPosition = useCallback(
    (pageX: number, pageY: number) => {
      handlerElement.current?.measure(
        (
          fx: number,
          fy: number,
          width: number,
          height: number,
          px: number,
          py: number
        ) => {
          const cx = pageX - px - width / 2;
          const cy = pageY - py - height / 2;
          setState((prevState) => ({ ...prevState, cx, cy }));
          centerAnimate();
        }
      );
    },
    [centerAnimate]
  );

  const setPosition = useCallback(
    (pageX: number, pageY: number, after?: () => void) => {
      wrapperElement.current?.measure(
        (
          fx: number,
          fy: number,
          width: number,
          height: number,
          px: number,
          py: number
        ) => {
          const cx = px + width / 2;
          const cy = py + height / 2;
          setState((prevState) => ({
            ...prevState,
            sx: cx,
            sy: cy,
            px: lockX ? 0 : pageX - cx,
            py: lockY ? 0 : pageY - cy,
          }));
          after?.();
        }
      );
    },
    [lockX, lockY]
  );

  const getTouchPoint = (touches: any, identifier: number | null) => {
    return touches.find((item: any) => item.identifier === identifier);
  };

  const onTouchStart = (evt: GestureResponderEvent) => {
    const identifier = evt.nativeEvent.identifier;
    const touchItem = getTouchPoint(evt.nativeEvent.touches, identifier as any);

    if (typeof identifier === 'number' && touchItem) {
      const { pageX, pageY } = touchItem;

      if (autoCenter) {
        centerPosition(pageX, pageY);
        sendValue(state.px, state.py);
        setIdentifier(identifier);
        setState((prevState) => ({
          ...prevState,
          sx: pageX,
          sy: pageY,
        }));
      } else {
        setPosition(pageX, pageY, () => {
          sendValue(state.px, state.py);
          animate();
        });
      }
    }
  };

  const onTouchMove = (evt: GestureResponderEvent) => {
    const touchItem = getTouchPoint(evt.nativeEvent.touches, identifier);
    if (touchItem) {
      const { pageX, pageY } = touchItem;

      let px = lockX ? 0 : pageX - state.sx + state.dx;
      let py = lockY ? 0 : pageY - state.sy + state.dy;

      px = lockX ? 0 : limitter(px);
      py = lockY ? 0 : limitter(py);

      sendValue(px, py);
      setState((prevState) => ({ ...prevState, px, py }));
      animate();
    }
  };

  const onTouchEnd = () => {
    let { px, py } = state;
    let dx = 0,
      dy = 0;

    if (resetOnRelease) {
      px = 0;
      py = 0;
    }
    if (autoCenter) {
      dx = px;
      dy = py;
    }

    sendValue(px, py);
    setState((prevState) => ({
      ...prevState,
      cx: 0,
      cy: 0,
      px,
      py,
      dx,
      dy,
    }));
    centerAnimate();
    animate();
  };

  const onTouchCancel = () => {
    setState((prevState) => ({ ...prevState, cx: 0, cy: 0 }));
    centerAnimate();
  };

  return (
    <Animated.View
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchCancel}
      onTouchMove={onTouchMove}
      style={[
        GamePadStyle.wrapper,
        wrapperStyle ? wrapperStyle : {},
        {
          width: state.width,
          height: state.width,
          transform: [
            {
              translateX: anim_cx,
            },
            { translateY: anim_cy },
          ],
        },
      ]}
      ref={wrapperElement}
    >
      <Animated.View
        ref={handlerElement}
        style={[
          GamePadStyle.handler,
          handlerStyle ? handlerStyle : {},
          {
            width: state.handler,
            height: state.handler,
            transform: [
              { translateX: anim_px },
              {
                translateY: anim_py,
              },
            ],
          },
        ]}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
};

export default GamePad;
