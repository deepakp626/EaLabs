// components/CallToAction.tsx
import { FiPhoneCall } from 'react-icons/fi';

const CallToAction = () => (
  <div className="max-w-7xl mx-2 md:mx-auto bg-[#22112A] rounded-2xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-center w-full max-w-5xl mx-auto">
    <div>
      <h2 className="text-[#FFE0A3] text-xl md:text-2xl font-semibold mb-2">Need help with booking your test?</h2>
      <p className="text-[#C3B1C7] text-base md:text-lg">Full body checkup with cancer</p>
    </div>
    <div className="flex items-center mt-6 md:mt-0">
      <span className="flex items-center gap-2 bg-[#FFD0A3] text-[#22112A] px-5 py-2 rounded-full font-medium shadow">
        <FiPhoneCall className="text-xl" />
        (012)8273957
      </span>
    </div>
  </div>
);

export default CallToAction;
