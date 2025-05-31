import { Modal } from "react-native";

import LottieView from "lottie-react-native";

import { View } from "@/components/ui/view";

export type SubmissionState = "idle" | "loading" | "error" | "success";

export type SubmittableProps = {
  submissionState: SubmissionState;

  onSuccessFinish?: () => void;
  onErrorFinish?: () => void;
  onLoadingFinish?: () => void;

  children?: React.ReactNode;
}

export const Submittable = ({ submissionState, onSuccessFinish, onErrorFinish, onLoadingFinish, children }: SubmittableProps) => {
  return (
    <>
      {children}

      <Modal
        animationType="none"
        transparent={true}
        visible={submissionState !== 'idle'}
        onRequestClose={() => {}}
      >
        <View className="w-screen h-screen flex-1 justify-center items-center bg-background">
          {submissionState === 'loading' && (
            <LottieView
              source={require('@/assets/lottie/loading.json')}
  
              style={{ width: 75, height: 75 }}
  
              autoPlay
              loop
  
              onAnimationFinish={(isCanceled) => {
                if (isCanceled) return;
                onLoadingFinish?.();
              }}
            />
          )}

          {submissionState === 'error' && (
            <LottieView
              source={require('@/assets/lottie/error.json')}
  
              style={{ width: 75, height: 75 }}
  
              autoPlay
              loop={false}
  
              onAnimationFinish={(isCanceled) => {
                if (isCanceled) return;
                onErrorFinish?.();
              }}
            />
          )}

          {submissionState === 'success' && (
            <LottieView
              source={require('@/assets/lottie/success.json')}
  
              style={{ width: 75, height: 75 }}
  
              autoPlay
              loop={false}
  
              onAnimationFinish={(isCanceled) => {
                if (isCanceled) return;
                onSuccessFinish?.();
              }}
            />
          )}
        </View>
      </Modal>
    </>
  )
}