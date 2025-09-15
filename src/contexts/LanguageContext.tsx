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
    back: "Back"
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
    back: "वापस"
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