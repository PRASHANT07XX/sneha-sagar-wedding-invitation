import React, { useEffect, useRef } from 'react';
import '../styles/WeddingCard.css';
import '../styles/Animations.css';

const InvitationContent = () => {
  const scrollRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.05 }
    );

    const currentRefs = scrollRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToScrollRefs = (el) => {
    if (el && !scrollRefs.current.includes(el)) {
      scrollRefs.current.push(el);
    }
  };

  const downloadCalendarInvite = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sneha and Sagar Wedding//EN',
      'BEGIN:VEVENT',
      'UID:sneha-sagar-wedding-20260620',
      'DTSTAMP:20260603T000000Z',
      'DTSTART;TZID=Asia/Kolkata:20260620T122800',
      'DTEND;TZID=Asia/Kolkata:20260620T160000',
      'SUMMARY:चि.सौ.कां. स्नेहा व चि. सागर विवाह सोहळा',
      'DESCRIPTION:चि.सौ.कां. स्नेहा व चि. सागर यांचा शुभविवाह सोहळा. शुभमुहूर्त: दुपारी १२:२८ वाजता.',
      'LOCATION:श्री स्वामी समर्थ मंगल कार्यालय, तांदुळवाडी, पंढरपूर-सातारा रोड, ता. माळशिरस, जि. सोलापूर',
      'SEQUENCE:0',
      'STATUS:CONFIRMED',
      'TRANSP:OPAQUE',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Sneha_Sagar_Wedding_Reminder.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(
      `|| श्री गणेशाय नमः ||\n\n` +
      `चि. सौ. कां. स्नेहा व चि. सागर यांच्या शुभविवाहाचे डिजिटल निमंत्रण पत्रक! 🌺\n` +
      `लग्न शनिवार, २० जून २०२६ रोजी दुपारी १२:२८ वाजता आहे.\n\n` +
      `कृपया खालील लिंक उघडून निमंत्रण स्वीकारावे:\n` +
      window.location.href
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  const printInvitation = () => {
    window.print();
  };

  // Reusable Kalash SVG component
  const KalashSVG = () => (
    <svg width="45" height="55" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 2px 4px rgba(170,124,17,0.4))' }}>
      {/* Mango Leaves */}
      <path d="M50 5 L35 45 L65 45 Z" fill="#2E7D32" />
      <path d="M50 5 L20 40 Q40 40 50 45 Z" fill="#1B5E20" />
      <path d="M50 5 L80 40 Q60 40 50 45 Z" fill="#1B5E20" />
      
      {/* Coconut */}
      <path d="M50 15 C35 30 35 45 50 55 C65 45 65 30 50 15 Z" fill="#8D6E63" />
      <path d="M50 15 C42 28 44 42 50 55" stroke="#5D4037" strokeWidth="2" />
      {/* Coconut golden crown */}
      <path d="M45 15 L50 5 L55 15 Z" fill="#aa7c11" />
      {/* Kalash Neck */}
      <path d="M25 55 L75 55 L70 65 L30 65 Z" fill="url(#goldGrad)" stroke="#8B0000" strokeWidth="1" />
      {/* Neck Ribbon/Thread (Mauli) */}
      <rect x="28" y="59" width="44" height="4" fill="#D50000" />
      
      {/* Kalash Body */}
      <path d="M30 65 C10 70 10 105 30 112 L70 112 C90 105 90 70 70 65 Z" fill="url(#goldGrad)" stroke="#8B0000" strokeWidth="1" />
      <path d="M30 112 L70 112 L65 118 L35 118 Z" fill="url(#goldGrad)" />
      
      {/* Swastik Swastika Symbol */}
      <path d="M42 80 L58 80 M50 72 L50 88 M42 72 L42 80 L50 80 M58 88 L58 80 L50 80 M50 72 L58 72 M50 88 L42 88" stroke="#8B0000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Coconut Shading lines */}
      <line x1="48" y1="20" x2="45" y2="35" stroke="#5D4037" strokeWidth="1.5" />
      <line x1="52" y1="22" x2="55" y2="38" stroke="#5D4037" strokeWidth="1.5" />
    </svg>
  );

  return (
    <div className="invitation-inner-card devanagari-text text-center">
      {/* Ornate Gold Inner Borders */}
      <div className="inner-gold-border-double" />
      <div style={{ position: 'relative', zIndex: 10, padding: '5px 0' }}>
        
        {/* Lord Ganesh Golden Pedestal & Text */}
        <div ref={addToScrollRefs} className="reveal-fade-up active mb-2" style={{ position: 'relative', display: 'inline-block' }}>
          {/* Rotating Golden Halo/Mandala behind Ganesh */}
          <svg
            className="rotating-halo"
            width="120"
            height="120"
            viewBox="0 0 100 100"
            fill="none"
            style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              marginLeft: '-60px',
              zIndex: 1,
              opacity: 0.5,
              pointerEvents: 'none'
            }}
          >
            <circle cx="50" cy="50" r="44" stroke="url(#goldGrad)" strokeWidth="0.5" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="34" stroke="url(#goldGrad)" strokeWidth="0.75" />
            <circle cx="50" cy="50" r="24" stroke="url(#goldGrad)" strokeWidth="0.5" strokeDasharray="1 2" />
            {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((angle) => (
              <line
                key={angle}
                x1="50"
                y1="6"
                x2="50"
                y2="14"
                stroke="url(#goldGrad)"
                strokeWidth="0.75"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <circle
                key={angle}
                cx="50"
                cy="19"
                r="1.5"
                fill="#8B0000"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
          </svg>
          {/* Ganesh SVG (Detailed solid gold carving matching the reference image) */}
          <svg
            className="ganesh-animated-icon"
            width="90"
            height="95"
            viewBox="0 0 100 110"
            fill="none"
            style={{ position: 'relative', zIndex: 2 }}
          >
            {/* Definitions for rich metallic gradients */}
            <defs>
              <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8A6614" />
                <stop offset="25%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FFF4B8" />
                <stop offset="75%" stopColor="#DFB12C" />
                <stop offset="100%" stopColor="#8A6614" />
              </linearGradient>
              <linearGradient id="rubyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF1744" />
                <stop offset="100%" stopColor="#880E4F" />
              </linearGradient>
            </defs>
            {/* Pedestal / Throne */}
            <path d="M15 88 C30 84 70 84 85 88 L80 98 C65 102 35 102 20 98 Z" fill="url(#goldPlate)" stroke="#5D4037" strokeWidth="0.75" />
            <path d="M22 98 C35 96 65 96 78 98 L75 105 C60 108 40 108 25 105 Z" fill="url(#goldPlate)" stroke="#5D4037" strokeWidth="0.75" />
            {/* Pedestal Lotus Petals */}
            <path d="M20 88 Q30 80 40 88 M40 88 Q50 80 60 88 M60 88 Q70 80 80 88" stroke="#8B0000" strokeWidth="1" />
            {/* Lord Ganesh Lower Body / Legs / Belly */}
            {/* Crossed Legs */}
            <path d="M18 88 C15 75 35 68 45 78 C35 84 25 86 18 88 Z" fill="url(#goldPlate)" stroke="#8B0000" strokeWidth="0.75" />
            <path d="M82 88 C85 75 65 68 55 78 C65 84 75 86 82 88 Z" fill="url(#goldPlate)" stroke="#8B0000" strokeWidth="0.75" />
            
            {/* Big Belly */}
            <circle cx="50" cy="72" r="18" fill="url(#goldPlate)" stroke="#8B0000" strokeWidth="1" />
            {/* Janeu Thread */}
            <path d="M38 62 Q50 72 58 84" stroke="#8B0000" strokeWidth="1.5" fill="none" />
            {/* Navel */}
            <circle cx="50" cy="75" r="2" fill="#8B0000" />
            {/* Arms */}
            {/* Left Back Hand holding Ankush */}
            <path d="M32 55 Q20 50 25 42 Q32 38 35 48" stroke="#8B0000" strokeWidth="1" fill="url(#goldPlate)" />
            <path d="M24 40 L28 32 L26 30 L22 36 Z" fill="url(#goldPlate)" stroke="#8B0000" strokeWidth="0.5" />
            
            {/* Right Back Hand holding Noose */}
            <path d="M68 55 Q80 50 75 42 Q68 38 65 48" stroke="#8B0000" strokeWidth="1" fill="url(#goldPlate)" />
            <circle cx="76" cy="38" r="4" stroke="#8B0000" strokeWidth="1.5" fill="none" />
            
            {/* Left Front Hand holding Modak plate */}
            <path d="M32 72 Q22 72 25 80 Q32 82 38 78" stroke="#8B0000" strokeWidth="1" fill="url(#goldPlate)" />
            {/* Modak plate & Modaks */}
            <ellipse cx="23" cy="75" rx="5" ry="2" fill="url(#goldPlate)" stroke="#8B0000" strokeWidth="0.5" />
            <circle cx="23" cy="73" r="2" fill="#FFC107" />
            <circle cx="21" cy="74" r="1.5" fill="#FFC107" />
            <circle cx="25" cy="74" r="1.5" fill="#FFC107" />
            {/* Right Front Hand (Abhaya Mudra Blessing) */}
            <path d="M68 72 Q78 72 75 80 Q68 82 62 78" stroke="#8B0000" strokeWidth="1" fill="url(#goldPlate)" />
            <path d="M72 72 Q77 65 74 62 Q70 65 70 70" stroke="#8B0000" strokeWidth="1" fill="url(#goldPlate)" />
            {/* Large Ears */}
            <path d="M38 35 C20 30 14 48 36 55 C38 48 38 40 38 35 Z" fill="url(#goldPlate)" stroke="#8B0000" strokeWidth="1" />
            <path d="M34 40 C24 38 22 45 32 48" stroke="#8B0000" strokeWidth="0.75" fill="none" />
            
            <path d="M62 35 C80 30 86 48 64 55 C62 48 62 40 62 35 Z" fill="url(#goldPlate)" stroke="#8B0000" strokeWidth="1" />
            <path d="M66 40 C76 38 78 45 68 48" stroke="#8B0000" strokeWidth="0.75" fill="none" />
            {/* Head and Face */}
            <path d="M38 35 C38 25 62 25 62 35 C62 48 56 50 56 58 L54 68 Q53 74 58 74 L60 74 Q63 74 62 70 L58 70 C56 70 56 65 58 60 Q62 50 62 35" fill="url(#goldPlate)" stroke="#8B0000" strokeWidth="1" />
            
            {/* Trunk details */}
            <path d="M48 58 Q46 62 46 66 Q46 72 52 72 Q56 72 56 68" stroke="#8B0000" strokeWidth="1" fill="none" />
            
            {/* Eye points */}
            <ellipse cx="45" cy="38" rx="1.5" ry="0.75" fill="#000000" />
            <ellipse cx="55" cy="38" rx="1.5" ry="0.75" fill="#000000" />
            
            {/* Tilak / Tikka */}
            <path d="M48 35 L52 35 L50 44 Z" fill="url(#rubyGrad)" />
            <line x1="46" y1="38" x2="54" y2="38" stroke="#FFD700" strokeWidth="1" />
            <line x1="47" y1="40" x2="53" y2="40" stroke="#FFD700" strokeWidth="1" />
            {/* Crown (Mukut) */}
            <path d="M42 27 L58 27 L55 18 L45 18 Z" fill="url(#goldPlate)" stroke="#8B0000" strokeWidth="1" />
            <path d="M45 18 L55 18 L53 10 L47 10 Z" fill="url(#goldPlate)" stroke="#8B0000" strokeWidth="1" />
            <path d="M47 10 L53 10 L50 3 Z" fill="url(#goldPlate)" stroke="#8B0000" strokeWidth="1" />
            {/* Ruby Gem in Mukut */}
            <circle cx="50" cy="14" r="2.5" fill="url(#rubyGrad)" />
            <circle cx="50" cy="3" r="1.5" fill="url(#rubyGrad)" />
          </svg>
          
          <h5 style={{ color: '#8B0000', fontSize: '1.25rem', fontWeight: 'bold', marginTop: '6px', letterSpacing: '1px', position: 'relative', zIndex: 2 }}>
            || श्री गणेशाय नमः ||
          </h5>
        </div>

        {/* BRIDE SECTION */}
        <div ref={addToScrollRefs} className="reveal-fade-up mb-3 mt-4">
          <h2 className="bride-groom-name mb-1">
            <span style={{ fontSize: '1.2rem', fontWeight: 'normal', color: '#555', fontFamily: 'serif' }}>चि. सौ. कां. </span>
            स्नेहा 
            <span style={{ fontSize: '1.2rem', fontWeight: 'normal', color: '#aa7c11' }}> (B.Sc.Agri)</span>
          </h2>
          
          <p className="bride-groom-details-text">
            कै. भानुदास आप्पा वगरे यांची नात व <br />
            सौ. कुसुम व श्री. रामकृष्ण भानुदास वगरे <br />
            रा. जैनवाडी ता. पंढरपूर जि. सोलापूर यांची ज्येष्ठ कन्या
          </p>
          
          {/* Horizontal line divider */}
          <div style={{ width: '60%', height: '1.5px', background: 'linear-gradient(90deg, transparent, #aa7c11 50%, transparent)', margin: '15px auto' }} />
        </div>

        {/* GROOM SECTION */}
        <div ref={addToScrollRefs} className="reveal-fade-up mb-4">
          <h2 className="bride-groom-name mb-1">
            <span style={{ fontSize: '1.2rem', fontWeight: 'normal', color: '#555', fontFamily: 'serif' }}>चि. </span>
            सागर 
            <span style={{ fontSize: '1.2rem', fontWeight: 'normal', color: '#aa7c11' }}> (PGDM/MBA)</span>
          </h2>
          
          <p className="bride-groom-details-text">
            कै. भानुदास गेना वळकुंदे यांचे नातू व <br />
            सौ. जनाबाई व श्री. बाळासाहेब भानुदास वळकुंदे <br />
            रा. निमगाव ता. माळशिरस जि. सोलापूर यांचे द्वितीय चिरंजीव
          </p>
        </div>

        {/* SHUBH VIVAH WITH DUAL KALASH */}
        <div ref={addToScrollRefs} className="reveal-fade-up my-4 d-flex justify-content-center align-items-center gap-3">
          <KalashSVG />
          <h1 className="wedding-title glowing-red-gold m-0 px-2" style={{ fontSize: '2.8rem', letterSpacing: '2px' }}>
            || शुभविवाह ||
          </h1>
          <KalashSVG />
        </div>

        {/* MUHURTA / DATE DETAILS */}
        <div ref={addToScrollRefs} className="reveal-fade-up mb-4 px-2">
          <p style={{ fontSize: '1.15rem', fontWeight: 'bold', color: '#331a00', margin: '0 0 5px' }}>
            शनिवार दि. २०/०६/२०२६ रोजी दुपारी १२ वा. २८ मि.
          </p>
          <p style={{ fontSize: '1.05rem', color: '#8B0000', fontWeight: 'bold', margin: '0 0 8px' }}>
            (मिती ज्येष्ठ शुद्ध ०६ शके १९४८)
          </p>
          <p style={{ fontSize: '0.85rem', color: '#555', maxWidth: '520px', margin: '0 auto', lineHeight: '1.6' }}>
            या शुभ मुहूर्तावर करण्याचे योजिले आहे. तरी या शुभप्रसंगी वधू-वरास <br />
            शुभाशिर्वाद देण्यासाठी आपली उपस्थिती प्रार्थनीय आहे.
          </p>
        </div>

        {/* SIDE-BY-SIDE EVENT & VENUE BOXES (Matching Image Layout) */}
        <div ref={addToScrollRefs} className="reveal-fade-up row g-3 px-2 mb-4">
          {/* Sakharpuda / Haldi */}
          <div className="col-sm-6">
            <div className="wedding-detail-box">
              <h4 className="detail-box-title">साखरपुडा व हळदी समारंभ</h4>
              <p className="detail-box-desc">
                शुक्रवार दि. १९/०६/२०२६ <br />
                <strong>सायंकाळी ९:०० वाजता</strong> (विवाहस्थळी)
              </p>
            </div>
          </div>
          {/* Venue */}
          <div className="col-sm-6">
            <div className="wedding-detail-box">
              <h4 className="detail-box-title">विवाहस्थळ</h4>
              <p className="detail-box-desc">
                <strong>श्री स्वामी समर्थ मंगल कार्यालय</strong> <br />
                तांदुळवाडी (पंढरपूर-सातारा रोड) <br />
                ता. माळशिरस जि. सोलापूर
              </p>
            </div>
          </div>
        </div>

        {/* AAPLE NAMRA (Respectfully Invitation) */}
        <div ref={addToScrollRefs} className="reveal-fade-up mb-4 py-2">
          <span style={{ fontSize: '0.9rem', color: '#8B0000', fontWeight: 'bold', letterSpacing: '1px' }}>
            आमचे नम्र&nbsp;&nbsp;&nbsp;
          </span>
          <p style={{ fontSize: '1rem', fontWeight: 'bold', color: '#331a00', margin: '4px 0 2px' }}>
            सौ. कुसुम रामकृष्ण वगरे&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;श्री. रामकृष्ण भानुदास वगरे
          </p>
          <p style={{ fontSize: '0.8rem', color: '#555', fontStyle: 'italic', margin: 0 }}>
            वरील विनंतीस मान देऊन कार्यास अगत्य यावे ही विनंती.
          </p>
           सौ. लक्ष्मी अर्जुन वगरे &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  श्री. अर्जुन मच्छिंद्र वगरे<br/>
           गं.भा. पारूबाई भानुदास वगरे
        </div>

        {/* RELATIVES SECTION */}
        <div ref={addToScrollRefs} className="reveal-fade-up invitees-section mb-4">
          <div className="invitees-title">आमचे स्नेही व नातेवाईक :</div>
          <p className="invitees-list">
        
            चि. प्रशांत रामकृष्ण वगरे (MCA)<br />
            चि. अक्षय अनंता गलांडे (B.Sc.Agri)<br />
            चि. सुरज अर्जुन वगरे (B.Com)<br />
            चि. अजय अनंता गलांडे (B.Sc.Agri)<br />
            चि. यशराजे संजय पाटील (Civil Engg)<br />
            चि. यश नितीन पाटील<br />
            चि. ओमराजे संजय पाटील<br />
            चि. वेदांत विष्णू हाके<br />
            चि. सागर आबासाहेब पाटील
          </p>
        </div>

        {/* KIDS SECTION */}
        <div ref={addToScrollRefs} className="reveal-fade-up invitees-section mb-4">
          <div className="invitees-title-small">छोटे निमंत्रक :</div>
          <p className="invitees-list-small mb-1">
            शौर्य, स्वरा, आरव, अन्वी, हर्ष, प्रांश, संभव, स्पृहा, देवांश, स्मित, राघव, वैभवी, श्रीशा, रुद्र समस्त वगरे परिवार यांचे शुभेच्छांसह !
          </p>
        </div>

        {/* BOTTOM THREE COLUMNS GRID */}
        <div ref={addToScrollRefs} className="reveal-fade-up row g-2 px-2 mb-4 bottom-columns-grid">
          
          {/* Column 1: Karyavahak */}
          <div className="col-4">
            <div className="bottom-col-box">
              <h5 className="bottom-col-title">कार्यावाहक</h5>
              <ul className="bottom-col-list">
                <li><strong>संजय वसंत पाटील</strong> <span className="small-label">(राष्ट्रवादी पुणे शहर उपाध्यक्ष, शिवमल्हार ब्रिगेड महाराष्ट्र राज्य अध्यक्ष)</span></li>
                <li><strong>विष्णू वसंत हाके</strong> <span className="small-label">(Force Company Dep. Manager)</span></li>
                <li>आबासाहेब शिवाजी पाटील</li>
                <li>नितीन शिवाजी पाटील</li>
                <li>सचिन सखाराम पाटील</li>
                <li>ॲड. सुहास सखाराम पाटील <span className="small-label">(वकील)</span></li>
              </ul>
            </div>
          </div>

          {/* Column 2: Swagatotsuk */}
          <div className="col-4">
            <div className="bottom-col-box">
              <h5 className="bottom-col-title">स्वागतोत्सुक</h5>
              <ul className="bottom-col-list">
                <li>बापूराव शामराव नारनवर <span className="small-label">(दूध उत्पादक)</span></li>
                <li>सोमनाथ शामराव नारनवर <span className="small-label">(MBA)</span></li>
                <li>प्रवीण तुकाराम हाके <span className="small-label">(B.E. Mechanical)</span></li>
                <li>प्रशांत तुकाराम हाके <span className="small-label">(M.Tech)</span></li>
                <li>रणजित बाळासो जमदाडे <span className="small-label">(B.Sc.Agri)</span></li>
                <li>डॉ. दिनेश बाळासो जमदाडे</li>
                <li>सचिन आदिनाथ गोफणे <span className="small-label">(बागायतदार)</span></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Vyavasthapak */}
          <div className="col-4">
            <div className="bottom-col-box">
              <h5 className="bottom-col-title">व्यवस्थापक</h5>
              <ul className="bottom-col-list">
                <li>अमोल नामदेव खुर्द <span className="small-label">(मामा)</span></li>
                <li>राहुल नामदेव खुर्द <span className="small-label">(मामा)</span></li>
                <li>अनंत शंकर गलांडे <span className="small-label">(काका)</span></li>
                <li>शामराव नारायण नारनवर</li>
                <li>तुकाराम रामकृष्ण हाके</li>
                <li>बाळासो रामकृष्ण हाके</li>
                <li>बाळासो रामचंद्र जमदाडे</li>
                <li>सुहास दत्तात्रय गोफणे</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FOOTER TIP */}
        <div ref={addToScrollRefs} className="reveal-fade-up mb-4">
          <div className="footer-tip-banner">
            टीप - कृपया अहेर व भेटवस्तू स्वीकारल्या जाणार नाहीत. आपली उपस्थिती हाच अनमोल आहे.
          </div>
        </div>

        {/* Utility Buttons */}
        <div ref={addToScrollRefs} className="reveal-fade-up action-buttons-container pb-3 d-print-none">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Shree+Swami+Samarth+Mangal+Karyalaya+Tandulwadi+Malshiras"
            target="_blank"
            rel="noopener noreferrer"
            className="btn gold-btn d-inline-flex align-items-center"
          >
            <i className="bi bi-geo-alt-fill me-2"></i>
            नकाशा (Maps)
          </a>
          <button onClick={downloadCalendarInvite} className="btn gold-btn d-inline-flex align-items-center">
            <i className="bi bi-calendar-event-fill me-2"></i>
            कॅलेंडर रिमाइंडर
          </button>
          <button onClick={shareOnWhatsApp} className="btn gold-btn d-inline-flex align-items-center">
            <i className="bi bi-whatsapp me-2"></i>
            शेअर करा
          </button>
          <button onClick={printInvitation} className="btn gold-btn d-inline-flex align-items-center">
            <i className="bi bi-file-earmark-pdf-fill me-2"></i>
            प्रिंट / सेव्ह (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationContent;
