import { WizardProvider } from './context/WizardContext';
import { Wizard } from './components/wizard/Wizard';

function App() {
  return (
    <WizardProvider>
      <Wizard />
    </WizardProvider>
  );
}

export default App;
