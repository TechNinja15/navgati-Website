import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'hi' | 'pa' | 'ta' | 'te' | 'bn'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    home: "Home",
    track: "Track",
    reportIssue: "Report Issue",
    downloadApp: "Download App",
    language: "Language",
    
    // Languages
    english: "English",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    tamil: "தமிழ்",
    telugu: "తెలుగు",
    bengali: "বাংলা",
    
    // Bus Tracking
    busNotFound: "Bus Not Found",
    busNotFoundDesc: "was not found in our system.",
    backToSearch: "Back to Search",
    routeInformation: "Route Information",
    routeInfoDesc: "Real-time bus location and route details",
    currentLocation: "Current Location:",
    lastUpdated: "Last Updated:",
    liveTracking: "Live Tracking",
    routeProgress: "Route Progress",
    routeProgressDesc: "Track the bus journey along its route",
    busHere: "Bus Here",
    departed: "Departed",
    eta: "ETA:",
    arrivalTime: "Arrival:",
    trafficStatus: "Traffic:",
    light: "Light",
    moderate: "Moderate",
    heavy: "Heavy",
    getDetailedLocation: "Get Detailed Location",
    viewLocationDesc: "View the exact location on Google Maps",
    viewOnMap: "View on Map",
    back: "Back",
    
    // Hero Section
    heroTagline: "NexGen Accessible Vehical Guidance and tracking Intelligence",
    heroTitle1: "Next-Generation",
    heroTitle2: "Transport Intelligence",
    heroSubtitle: "NavGati brings real-time bus tracking, intelligent route planning, and seamless schedule management to transform your daily commute experience.",
    realTimeTracking: "Real-time Tracking",
    realTimeTrackingDesc: "Live bus locations and accurate arrival times",
    smartSchedules: "Smart Schedules",
    smartSchedulesDesc: "Intelligent schedule planning and notifications",
    routeOptimization: "Route Optimization",
    routeOptimizationDesc: "Find the fastest routes to your destination",
    
    // Features Section
    featuresTitle1: "Everything You Need for",
    featuresTitle2: "Smarter Commuting",
    featuresSubtitle: "NavGati combines cutting-edge technology with user-friendly design to revolutionize your public transport experience.",
    realTimeBusTracking: "Real-time Bus Tracking",
    realTimeBusTrackingDesc: "Track buses live on interactive maps with precise GPS locations and estimated arrival times.",
    routeInformationTitle: "Route Information",
    routeInformationDesc: "Complete route details, stops, and connections to help you navigate the transport network.",
    darkLightMode: "Dark & Light Mode",
    darkLightModeDesc: "Seamlessly switch between themes for comfortable viewing in any lighting condition.",
    lightningFast: "Lightning Fast",
    lightningFastDesc: "Optimized for speed and low bandwidth usage, perfect for all network conditions.",
    accessibleDesign: "Accessible Design",
    accessibleDesignDesc: "Built with accessibility in mind, ensuring everyone can use public transport effectively.",
    privacyFirst: "Privacy First",
    privacyFirstDesc: "Your data is protected with industry-standard security and privacy measures.",
    communityDriven: "Community Driven",
    communityDrivenDesc: "Help improve the service by reporting issues and sharing feedback with the community.",
    
    // Track Page
    trackYourBus: "Track Your Bus",
    trackSubtitle: "Enter your city and bus number to get real-time location updates and route information.",
    searchBus: "Search Bus",
    searchBusDesc: "Select your city and enter the bus number to track its location",
    selectCity: "Select City",
    chooseCityPlaceholder: "Choose your city",
    routeNumber: "Route Number",
    routeNumberPlaceholder: "Enter route number (e.g., 18, 42, 65)",
    searchResults: "Search Results",
    cityRequired: "City Required",
    cityRequiredDesc: "Please select a city first.",
    routeNumberRequired: "Route Number Required",
    routeNumberRequiredDesc: "Please enter a route number to search.",
    busFound: "Bus Found!",
    busFoundDesc: "Found route {routeNumber} - Bus {busNumber}",
    noBusFound: "No Bus Found",
    noBusFoundDesc: "No bus was found with route number \"{routeNumber}\" in {city}. Please check the route number and try again.",
    route: "Route:",
    currentlyAt: "Currently at:",
    trackBus: "Track Bus",
    
    // Complaints Page
    backToHome: "Back to Home",
    reportAnIssue: "Report an Issue",
    complaintsSubtitle: "Help us improve NavGati by reporting any issues you've encountered. Your feedback is valuable in making public transport better for everyone.",
    submitComplaint: "Submit Your Complaint",
    submitComplaintDesc: "Please provide detailed information about the issue you encountered.",
    yourName: "Your Name",
    yourNamePlaceholder: "Enter your full name",
    busNumber: "Bus Number",
    busNumberPlaceholder: "e.g., DL1PC9999",
    busRouteNumber: "Bus Route Number",
    busRouteNumberPlaceholder: "e.g., 543, AC-12",
    complaintDetails: "Complaint Details",
    complaintDetailsPlaceholder: "Describe the issue you encountered in detail...",
    submitting: "Submitting...",
    submitComplaintBtn: "Submit Complaint",
    complaintSubmitted: "Complaint Submitted",
    complaintSubmittedDesc: "Thank you for your feedback. We'll review your complaint shortly.",
    needImmediateHelp: "Need Immediate Help?",
    urgentIssuesDesc: "For urgent issues or emergencies:",
    emergencyHelpline: "Emergency Helpline",
    emailSupport: "Email Support",
    commonIssues: "Common Issues",
    
    // Download Page
    downloadNavGatiApp: "Download NavGati App",
    downloadSubtitle: "Get the full NavGati experience on your mobile device. Track buses in real-time, plan your journey, and stay updated with the latest transport information.",
    availableNow: "Available Now",
    downloadForAndroid: "Download for Android",
    downloadForIOS: "Download for iOS",
    downloads: "Downloads",
    rating: "Rating",
    uptime: "Uptime",
    keyFeatures: "Key Features",
    realTimeGPS: "Real-time bus tracking with GPS precision",
    smartRoutePlanning: "Smart route planning and optimization",
    offlineAccess: "Offline schedule access and notifications",
    darkLightSupport: "Dark and light mode support",
    navGatiMobile: "NavGati Mobile",
    version: "Version 2.1.0",
    free: "Free",
    noAds: "No Ads",
    appScreenshots: "App Screenshots",
    systemRequirements: "System Requirements",
    androidIOS: "Android 6.0+ or iOS 12.0+",
    storage: "50 MB available storage",
    internetRequired: "Internet connection required",
    gpsRequired: "GPS for location services",
    verifiedSafe: "Verified Safe",
    verifiedSafeDesc: "This app has been verified by the Indian government and follows all data protection guidelines.",
    whyChooseNavGati: "Why Choose NavGati?",
    whyChooseDesc: "NavGati is an official government initiative designed to modernize public transport in India. Built with cutting-edge technology and user privacy in mind.",
    govVerified: "Government verified and secure",
    noHiddenFees: "No hidden fees or subscriptions",
    regularUpdates: "Regular updates and improvements",
    customerSupport: "24/7 customer support",
    needHelp: "Need Help?",
    needHelpDesc: "Having trouble with the download or installation? Our support team is here to help you get started.",
    support: "Support:",
    helpline: "Helpline:",
    
    // Footer
    navGatiTagline: "NexGen Accessible Vehicle Guidance and Tracking Intelligence - Revolutionizing public transport with smart technology.",
    quickLinks: "Quick Links",
    contact: "Contact",
    transportAuthority: "Transport Authority",
    ministryName: "Ministry of Road Transport & Highways",
    govInitiative: "Official government initiative for digital public transport services.",
    copyrightText: "© 2025 NavGati. All rights reserved. A Digital India Initiative.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    accessibility: "Accessibility"
  },
  hi: {
    // Navigation
    home: "होम",
    track: "ट्रैक करें",
    reportIssue: "शिकायत दर्ज करें",
    downloadApp: "ऐप डाउनलोड करें",
    language: "भाषा",
    
    // Languages
    english: "English",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    tamil: "தமிழ்",
    telugu: "తెలుగు",
    bengali: "বাংলা",
    
    // Bus Tracking
    busNotFound: "बस नहीं मिली",
    busNotFoundDesc: "हमारे सिस्टम में नहीं मिली।",
    backToSearch: "खोज पर वापस जाएं",
    routeInformation: "रूट की जानकारी",
    routeInfoDesc: "वास्तविक समय में बस का स्थान और रूट विवरण",
    currentLocation: "वर्तमान स्थान:",
    lastUpdated: "अंतिम अपडेट:",
    liveTracking: "लाइव ट्रैकिंग",
    routeProgress: "रूट प्रगति",
    routeProgressDesc: "रूट के साथ बस की यात्रा को ट्रैक करें",
    busHere: "बस यहाँ है",
    departed: "प्रस्थान",
    eta: "पहुंचने का समय:",
    arrivalTime: "आगमन:",
    trafficStatus: "ट्रैफिक:",
    light: "हल्का",
    moderate: "मध्यम",
    heavy: "भारी",
    getDetailedLocation: "विस्तृत स्थान प्राप्त करें",
    viewLocationDesc: "Google Maps पर सटीक स्थान देखें",
    viewOnMap: "मैप पर देखें",
    back: "वापस",
    
    // Hero Section
    heroTagline: "नेक्सजेन सुलभ वाहन मार्गदर्शन और ट्रैकिंग इंटेलिजेंस",
    heroTitle1: "अगली पीढ़ी",
    heroTitle2: "ट्रांसपोर्ट इंटेलिजेंस",
    heroSubtitle: "NavGati रियल-टाइम बस ट्रैकिंग, इंटेलिजेंट रूट प्लानिंग, और सीमलेस शेड्यूल मैनेजमेंट लाता है आपके दैनिक यात्रा अनुभव को बदलने के लिए।",
    realTimeTracking: "रियल-टाइम ट्रैकिंग",
    realTimeTrackingDesc: "लाइव बस लोकेशन और सटीक आगमन समय",
    smartSchedules: "स्मार्ट शेड्यूल",
    smartSchedulesDesc: "इंटेलिजेंट शेड्यूल प्लानिंग और नोटिफिकेशन",
    routeOptimization: "रूट ऑप्टिमाइज़ेशन",
    routeOptimizationDesc: "अपने गंतव्य के लिए सबसे तेज़ रूट खोजें",
    
    // Features Section
    featuresTitle1: "स्मार्ट कम्यूटिंग के लिए",
    featuresTitle2: "सब कुछ जो आपको चाहिए",
    featuresSubtitle: "NavGati आपके सार्वजनिक परिवहन अनुभव को क्रांतिकारी बनाने के लिए अत्याधुनिक तकनीक को उपयोगकर्ता-अनुकूल डिज़ाइन के साथ जोड़ता है।",
    realTimeBusTracking: "रियल-टाइम बस ट्रैकिंग",
    realTimeBusTrackingDesc: "सटीक GPS स्थानों और अनुमानित आगमन समय के साथ इंटरैक्टिव मैप्स पर बसों को लाइव ट्रैक करें।",
    routeInformationTitle: "रूट जानकारी",
    routeInformationDesc: "परिवहन नेटवर्क में नेविगेट करने में मदद के लिए पूरी रूट जानकारी, स्टॉप्स, और कनेक्शन्स।",
    darkLightMode: "डार्क और लाइट मोड",
    darkLightModeDesc: "किसी भी प्रकाश स्थिति में आरामदायक देखने के लिए थीम्स के बीच सहजता से स्विच करें।",
    lightningFast: "बिजली की तेज़ी",
    lightningFastDesc: "गति और कम बैंडविड्थ उपयोग के लिए अनुकूलित, सभी नेटवर्क स्थितियों के लिए उपयुक्त।",
    accessibleDesign: "सुलभ डिज़ाइन",
    accessibleDesignDesc: "सुलभता को ध्यान में रखकर बनाया गया, यह सुनिश्चित करता है कि हर कोई सार्वजनिक परिवहन का प्रभावी रूप से उपयोग कर सके।",
    privacyFirst: "गोपनीयता प्राथमिकता",
    privacyFirstDesc: "आपका डेटा उद्योग-मानक सुरक्षा और गोपनीयता उपायों से सुरक्षित है।",
    communityDriven: "समुदाय संचालित",
    communityDrivenDesc: "समुदाय के साथ समस्याओं की रिपोर्ट करके और फीडबैक साझा करके सेवा में सुधार करने में मदद करें।",
    
    // Track Page
    trackYourBus: "अपनी बस ट्रैक करें",
    trackSubtitle: "रियल-टाइम स्थान अपडेट और रूट जानकारी प्राप्त करने के लिए अपना शहर और बस नंबर दर्ज करें।",
    searchBus: "बस खोजें",
    searchBusDesc: "अपना शहर चुनें और इसके स्थान को ट्रैक करने के लिए बस नंबर दर्ज करें",
    selectCity: "शहर चुनें",
    chooseCityPlaceholder: "अपना शहर चुनें",
    routeNumber: "रूट नंबर",
    routeNumberPlaceholder: "रूट नंबर दर्ज करें (जैसे, 18, 42, 65)",
    searchResults: "खोज परिणाम",
    cityRequired: "शहर आवश्यक",
    cityRequiredDesc: "कृपया पहले एक शहर चुनें।",
    routeNumberRequired: "रूट नंबर आवश्यक",
    routeNumberRequiredDesc: "कृपया खोजने के लिए एक रूट नंबर दर्ज करें।",
    busFound: "बस मिली!",
    busFoundDesc: "रूट {routeNumber} मिला - बस {busNumber}",
    noBusFound: "कोई बस नहीं मिली",
    noBusFoundDesc: "{city} में रूट नंबर \"{routeNumber}\" के साथ कोई बस नहीं मिली। कृपया रूट नंबर जांचें और फिर कोशिश करें।",
    route: "रूट:",
    currentlyAt: "वर्तमान में:",
    trackBus: "बस ट्रैक करें",
    
    // Complaints Page
    backToHome: "होम पर वापस जाएं",
    reportAnIssue: "एक समस्या रिपोर्ट करें",
    complaintsSubtitle: "आपके सामने आई किसी भी समस्या की रिपोर्ट करके NavGati को बेहतर बनाने में हमारी मदद करें। आपका फीडबैक सभी के लिए सार्वजनिक परिवहन को बेहतर बनाने में मूल्यवान है।",
    submitComplaint: "अपनी शिकायत जमा करें",
    submitComplaintDesc: "कृपया आपके सामने आई समस्या के बारे में विस्तृत जानकारी प्रदान करें।",
    yourName: "आपका नाम",
    yourNamePlaceholder: "अपना पूरा नाम दर्ज करें",
    busNumber: "बस नंबर",
    busNumberPlaceholder: "जैसे, DL1PC9999",
    busRouteNumber: "बस रूट नंबर",
    busRouteNumberPlaceholder: "जैसे, 543, AC-12",
    complaintDetails: "शिकायत विवरण",
    complaintDetailsPlaceholder: "आपके सामने आई समस्या का विस्तार से वर्णन करें...",
    submitting: "जमा कर रहे हैं...",
    submitComplaintBtn: "शिकायत जमा करें",
    complaintSubmitted: "शिकायत जमा की गई",
    complaintSubmittedDesc: "आपके फीडबैक के लिए धन्यवाद। हम जल्द ही आपकी शिकायत की समीक्षा करेंगे।",
    needImmediateHelp: "तत्काल सहायता चाहिए?",
    urgentIssuesDesc: "तत्काल मुद्दों या आपातकाल के लिए:",
    emergencyHelpline: "आपातकालीन हेल्पलाइन",
    emailSupport: "ईमेल सहायता",
    commonIssues: "सामान्य समस्याएं",
    
    // Download Page
    downloadNavGatiApp: "NavGati ऐप डाउनलोड करें",
    downloadSubtitle: "अपने मोबाइल डिवाइस पर पूरा NavGati अनुभव प्राप्त करें। रियल-टाइम में बसों को ट्रैक करें, अपनी यात्रा की योजना बनाएं, और नवीनतम परिवहन जानकारी के साथ अपडेट रहें।",
    availableNow: "अब उपलब्ध",
    downloadForAndroid: "Android के लिए डाउनलोड करें",
    downloadForIOS: "iOS के लिए डाउनलोड करें",
    downloads: "डाउनलोड्स",
    rating: "रेटिंग",
    uptime: "अपटाइम",
    keyFeatures: "मुख्य विशेषताएं",
    realTimeGPS: "GPS सटीकता के साथ रियल-टाइम बस ट्रैकिंग",
    smartRoutePlanning: "स्मार्ट रूट प्लानिंग और ऑप्टिमाइज़ेशन",
    offlineAccess: "ऑफलाइन शेड्यूल एक्सेस और नोटिफिकेशन",
    darkLightSupport: "डार्क और लाइट मोड सपोर्ट",
    navGatiMobile: "NavGati मोबाइल",
    version: "संस्करण 2.1.0",
    free: "मुफ्त",
    noAds: "कोई विज्ञापन नहीं",
    appScreenshots: "ऐप स्क्रीनशॉट्स",
    systemRequirements: "सिस्टम आवश्यकताएं",
    androidIOS: "Android 6.0+ या iOS 12.0+",
    storage: "50 MB उपलब्ध स्टोरेज",
    internetRequired: "इंटरनेट कनेक्शन आवश्यक",
    gpsRequired: "स्थान सेवाओं के लिए GPS",
    verifiedSafe: "सत्यापित सुरक्षित",
    verifiedSafeDesc: "यह ऐप भारत सरकार द्वारा सत्यापित किया गया है और सभी डेटा संरक्षण दिशानिर्देशों का पालन करता है।",
    whyChooseNavGati: "NavGati क्यों चुनें?",
    whyChooseDesc: "NavGati भारत में सार्वजनिक परिवहन को आधुनिक बनाने के लिए डिज़ाइन किया गया एक आधिकारिक सरकारी पहल है। अत्याधुनिक तकनीक और उपयोगकर्ता गोपनीयता को ध्यान में रखकर बनाया गया।",
    govVerified: "सरकार द्वारा सत्यापित और सुरक्षित",
    noHiddenFees: "कोई छुपी हुई फीस या सब्सक्रिप्शन नहीं",
    regularUpdates: "नियमित अपडेट और सुधार",
    customerSupport: "24/7 कस्टमर सपोर्ट",
    needHelp: "सहायता चाहिए?",
    needHelpDesc: "डाउनलोड या इंस्टॉलेशन में परेशानी हो रही है? हमारी सहायता टीम आपको शुरुआत करने में मदद करने के लिए यहां है।",
    support: "सहायता:",
    helpline: "हेल्पलाइन:",
    
    // Footer
    navGatiTagline: "नेक्सजेन सुलभ वाहन मार्गदर्शन और ट्रैकिंग इंटेलिजेंस - स्मार्ट तकनीक के साथ सार्वजनिक परिवहन में क्रांति लाना।",
    quickLinks: "त्वरित लिंक",
    contact: "संपर्क",
    transportAuthority: "परिवहन प्राधिकरण",
    ministryName: "सड़क परिवहन और राजमार्ग मंत्रालय",
    govInitiative: "डिजिटल सार्वजनिक परिवहन सेवाओं के लिए आधिकारिक सरकारी पहल।",
    copyrightText: "© 2025 NavGati। सभी अधिकार सुरक्षित। एक डिजिटल इंडिया पहल।",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    accessibility: "सुलभता"
  },
  pa: {
    // Navigation
    home: "ਘਰ",
    track: "ਟਰੈਕ ਕਰੋ",
    reportIssue: "ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ",
    downloadApp: "ਐਪ ਡਾਊਨਲੋਡ ਕਰੋ",
    language: "ਭਾਸ਼ਾ",
    
    // Languages
    english: "English",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    tamil: "தமிழ்",
    telugu: "తెలుగు",
    bengali: "বাংলা",
    
    // Bus Tracking
    busNotFound: "ਬੱਸ ਨਹੀਂ ਮਿਲੀ",
    busNotFoundDesc: "ਸਾਡੇ ਸਿਸਟਮ ਵਿੱਚ ਨਹੀਂ ਮਿਲੀ।",
    backToSearch: "ਖੋਜ ਤੇ ਵਾਪਸ ਜਾਓ",
    routeInformation: "ਰੂਟ ਦੀ ਜਾਣਕਾਰੀ",
    routeInfoDesc: "ਅਸਲ ਸਮੇਂ ਵਿੱਚ ਬੱਸ ਦਾ ਸਥਾਨ ਅਤੇ ਰੂਟ ਵੇਰਵਾ",
    currentLocation: "ਮੌਜੂਦਾ ਸਥਾਨ:",
    lastUpdated: "ਆਖਰੀ ਅਪਡੇਟ:",
    liveTracking: "ਲਾਈਵ ਟਰੈਕਿੰਗ",
    routeProgress: "ਰੂਟ ਪ੍ਰਗਤੀ",
    routeProgressDesc: "ਰੂਟ ਦੇ ਨਾਲ ਬੱਸ ਦੀ ਯਾਤਰਾ ਨੂੰ ਟਰੈਕ ਕਰੋ",
    busHere: "ਬੱਸ ਇੱਥੇ ਹੈ",
    departed: "ਰਵਾਨਾ",
    eta: "ਪਹੁੰਚਣ ਦਾ ਸਮਾਂ:",
    arrivalTime: "ਆਗਮਨ:",
    trafficStatus: "ਟਰੈਫਿਕ:",
    light: "ਹਲਕਾ",
    moderate: "ਮੱਧਮ",
    heavy: "ਭਾਰੀ",
    getDetailedLocation: "ਵਿਸਤ੍ਰਿਤ ਸਥਾਨ ਪ੍ਰਾਪਤ ਕਰੋ",
    viewLocationDesc: "Google Maps ਤੇ ਸਹੀ ਸਥਾਨ ਦੇਖੋ",
    viewOnMap: "ਮੈਪ ਤੇ ਦੇਖੋ",
    back: "ਵਾਪਸ"
  },
  ta: {
    // Navigation
    home: "வீடு",
    track: "கண்காணிக்கவும்",
    reportIssue: "புகார் அளிக்கவும்",
    downloadApp: "ஆப் பதிவிறக்கவும்",
    language: "மொழி",
    
    // Languages
    english: "English",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    tamil: "தமிழ்",
    telugu: "తెలుగు",
    bengali: "বাংলা",
    
    // Bus Tracking
    busNotFound: "பேருந்து கண்டுபிடிக்கப்படவில்லை",
    busNotFoundDesc: "எங்கள் அமைப்பில் கண்டுபிடிக்கப்படவில்லை।",
    backToSearch: "தேடலுக்கு திரும்பவும்",
    routeInformation: "பாதை தகவல்",
    routeInfoDesc: "நிகழ்நேர பேருந்து இருப்பிடம் மற்றும் பாதை விவரங்கள்",
    currentLocation: "தற்போதைய இருப்பிடம்:",
    lastUpdated: "கடைசியாக புதுப்பிக்கப்பட்டது:",
    liveTracking: "நேரடி கண்காணிப்பு",
    routeProgress: "பாதை முன்னேற்றம்",
    routeProgressDesc: "பாதையில் பேருந்து பயணத்தை கண்காணிக்கவும்",
    busHere: "பேருந்து இங்கே உள்ளது",
    departed: "புறப்பட்டது",
    eta: "வருகை நேரம்:",
    arrivalTime: "வருகை:",
    trafficStatus: "போக்குவரத்து:",
    light: "குறைவு",
    moderate: "மிதமான",
    heavy: "அதிகம்",
    getDetailedLocation: "விரிவான இருப்பிடம் பெறவும்",
    viewLocationDesc: "Google Maps இல் சரியான இருப்பிடத்தை பார்க்கவும்",
    viewOnMap: "மேப்பில் பார்க்கவும்",
    back: "திரும்பவும்"
  },
  te: {
    // Navigation
    home: "హోమ్",
    track: "ట్రాక్ చేయండి",
    reportIssue: "ఫిర్యాదు నమోదు చేయండి",
    downloadApp: "యాప్ డౌన్లోడ్ చేయండి",
    language: "భాష",
    
    // Languages
    english: "English",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    tamil: "தமிழ்",
    telugu: "తెలుగు",
    bengali: "বাংলা",
    
    // Bus Tracking
    busNotFound: "బస్ కనుగొనబడలేదు",
    busNotFoundDesc: "మా సిస్టమ్లో కనుగొనబడలేదు।",
    backToSearch: "వెతుకుటకు తిరిగి వెళ్ళండి",
    routeInformation: "రూట్ సమాచారం",
    routeInfoDesc: "నిజ-సమయ బస్ స్థానం మరియు రూట్ వివరాలు",
    currentLocation: "ప్రస్తుత స్థానం:",
    lastUpdated: "చివరిగా అప్డేట్ చేయబడింది:",
    liveTracking: "లైవ్ ట్రాకింగ్",
    routeProgress: "రూట్ పురోగతి",
    routeProgressDesc: "రూట్లో బస్ ప్రయాణాన్ని ట్రాక్ చేయండి",
    busHere: "బస్ ఇక్కడ ఉంది",
    departed: "బయలుదేరింది",
    eta: "చేరుకునే సమయం:",
    arrivalTime: "రాక:",
    trafficStatus: "ట్రాఫిక్:",
    light: "తక్కువ",
    moderate: "మధ్యస్థ",
    heavy: "ఎక్కువ",
    getDetailedLocation: "వివరమైన స్థానం పొందండి",
    viewLocationDesc: "Google Maps లో ఖచ్చితమైన స్థానాన్ని చూడండి",
    viewOnMap: "మ్యాప్లో చూడండి",
    back: "వెనుకకు"
  },
  bn: {
    // Navigation
    home: "হোম",
    track: "ট্র্যাক করুন",
    reportIssue: "অভিযোগ জানান",
    downloadApp: "অ্যাপ ডাউনলোড করুন",
    language: "ভাষা",
    
    // Languages
    english: "English",
    hindi: "हिंदी",
    punjabi: "ਪੰਜਾਬੀ",
    tamil: "தமிழ்",
    telugu: "తెలుగు",
    bengali: "বাংলা",
    
    // Bus Tracking
    busNotFound: "বাস পাওয়া যায়নি",
    busNotFoundDesc: "আমাদের সিস্টেমে পাওয়া যায়নি।",
    backToSearch: "অনুসন্ধানে ফিরে যান",
    routeInformation: "রুটের তথ্য",
    routeInfoDesc: "রিয়েল-টাইম বাসের অবস্থান এবং রুটের বিবরণ",
    currentLocation: "বর্তমান অবস্থান:",
    lastUpdated: "সর্বশেষ আপডেট:",
    liveTracking: "লাইভ ট্র্যাকিং",
    routeProgress: "রুটের অগ্রগতি",
    routeProgressDesc: "রুট বরাবর বাসের যাত্রা ট্র্যাক করুন",
    busHere: "বাস এখানে আছে",
    departed: "ছেড়েছে",
    eta: "পৌঁছানোর সময়:",
    arrivalTime: "আগমন:",
    trafficStatus: "ট্রাফিক:",
    light: "হালকা",
    moderate: "মাঝারি",
    heavy: "ভারী",
    getDetailedLocation: "বিস্তারিত অবস্থান পান",
    viewLocationDesc: "Google Maps এ সঠিক অবস্থান দেখুন",
    viewOnMap: "মানচিত্রে দেখুন",
    back: "পিছনে"
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('navgati-language') as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('navgati-language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}