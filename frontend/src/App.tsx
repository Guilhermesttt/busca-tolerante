import { MotionConfig } from 'framer-motion';
import { MainLayout } from './components/MainLayout';

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <MainLayout />
    </MotionConfig>
  );
}

export default App;
