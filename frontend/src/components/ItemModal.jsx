// src/components/ItemModal.js
import React, { useState, useEffect } from 'react'; // 1. Import useEffect
import Carousel from './Carousel';
import sendMail from '../utils/sendMail';
import { X, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

const ItemModal = ({ item, onClose }) => {
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null); // Can be 'success', 'error', or null

  useEffect(() => {
    setIsSending(false);
    setSendStatus(null);
  }, [item]); // The dependency array [item] tells React to run this effect when `item` changes.

  if (!item) return null;

  const allImages = [item.coverImage, ...item.additionalImages].filter(Boolean);

  const handleEnquire = async () => {
    setIsSending(true);
    setSendStatus(null);

    const templateParams = {
      to_email: 'tejhagargiaws@gmail.com',
      item_name: item.name,
      item_type: item.type,
    };

    console.log("Sending enquiry email with params:", templateParams);

    try {
      await sendMail(templateParams);
      setSendStatus('success');
      console.log("Enquiry email sent successfully!");
    } catch (error) {
      console.error("Failed to send enquiry email:", error);
      setSendStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  const getButtonContent = () => {
    if (isSending) {
      return {
        text: "Sending...",
        icon: <Loader2 className="mr-2 h-5 w-5 animate-spin" />,
        className: "bg-gray-400 cursor-not-allowed",
      };
    }
    if (sendStatus === 'success') {
      return {
        text: "Enquiry Sent!",
        icon: <CheckCircle className="mr-2 h-5 w-5" />,
        className: "bg-green-600",
      };
    }
    if (sendStatus === 'error') {
      return {
        text: "Failed! Try Again",
        icon: <AlertTriangle className="mr-2 h-5 w-5" />,
        className: "bg-red-600 hover:bg-red-700",
      };
    }
    return {
      text: "Enquire",
      icon: null,
      className: "bg-indigo-600 hover:bg-indigo-700",
    };
  };

  const buttonState = getButtonContent();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white md:text-gray-500 bg-black bg-opacity-30 md:bg-transparent p-1 rounded-full z-10">
          <X size={28} />
        </button>

        <div className="w-full md:w-1/2 aspect-square bg-gray-100">
          <Carousel images={allImages} />
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
          <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 self-start">
            {item.type}
          </span>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{item.name}</h2>
          <p className="text-gray-600 flex-grow mb-6">{item.description}</p>
          
          <button
            onClick={handleEnquire}
            disabled={isSending || sendStatus === 'success'}
            className={`mt-auto w-full flex items-center justify-center text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 ${buttonState.className}`}
          >
            {buttonState.icon}
            {buttonState.text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;