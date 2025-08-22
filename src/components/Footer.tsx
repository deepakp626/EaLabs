import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
} from "react-icons/fa";
import Image from "next/image";
import Logo from '../../public/logo.png'

const Footer = () => {
  return (
    <footer className="bg-[#1E1E1C] px-4 md:px-12 pt-14 pb-4 rounded-[30px] mt-8">
      {/* Top white rounded section */}
      <div className="bg-white rounded-[30px] px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* 1 */}
          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>What’s New</li>
              <li>About</li>
              <li>Press</li>
              <li>Careers</li>
              <li>Social Good</li>
              <li>Contact</li>
            </ul>
          </div>
          {/* 2 */}
          <div>
            <h3 className="font-semibold mb-3">Community</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Medicare for Business</li>
              <li>2022 Creator Report</li>
              <li>Charities</li>
              <li>Creator Profile Directory</li>
              <li>Explore Templates</li>
            </ul>
          </div>
          {/* 3 */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Help Topics</li>
              <li>Getting Started</li>
              <li>Linktree Pro</li>
              <li>Features & How-Tos</li>
              <li>FAQs</li>
              <li>Report a Violation</li>
            </ul>
          </div>
          {/* 4 */}
          <div>
            <h3 className="font-semibold mb-3">Trust & Legal</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Terms & Conditions</li>
              <li>Privacy Notice</li>
              <li>Cookie Notice</li>
              <li>Trust Center</li>
              <li>Cookie Preferences</li>
            </ul>
          </div>
        </div>

        {/* App badges + Social icons */}
        <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="flex gap-3">
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="appstore"
              className="h-10"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="playstore"
              className="h-10"
            />
          </div>
          <div className="flex gap-4 text-gray-500">
            <FaInstagram className="h-5 w-5 hover:text-neutral-black cursor-pointer" />
            <FaTwitter className="h-5 w-5 hover:text-neutral-black cursor-pointer" />
            <FaFacebookF className="h-5 w-5 hover:text-neutral-black cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Large brand block */}
      <div className="mt-8 bg-[#A6DBD8] rounded-[30px] py-12 flex justify-center items-center">
        <div className="flex items-center gap-4">
          <div className="">
            <Image 
              src={Logo}
              height={300}
              width={300}
              alt="logo"
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-between items-center text-gray-400 text-xs mt-4">
        <span>©2022 Medicare</span>
        <span>Design & Developed by MUSEMIND</span>
      </div>
    </footer>
  );
};

export default Footer;
