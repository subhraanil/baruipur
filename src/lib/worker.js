// Background Autonomous Social Media News Ingestion Worker
const INTERVAL_MINUTES = 10;

async function triggerCrawl() {
  const timestamp = new Date().toLocaleTimeString('bn-IN');
  console.log(`[${timestamp}] 🔄 স্বয়ংক্রিয় সোশ্যাল মিডিয়া ক্রলিং শুরু হচ্ছে...`);
  try {
    const res = await fetch('http://localhost:3000/api/crawler/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ all: true })
    });
    const data = await res.json();
    if (data.success) {
      console.log('✅ ' + data.message);
    } else {
      console.warn('⚠️ ক্রলিং সতর্কবার্তা:', data.error);
    }
  } catch (err) {
    console.error('❌ ক্রলার সংযোগ ব্যর্থ:', err.message);
  }
}

console.log(`🚀 বারুইপুর ক্রলার ওয়ার্কার সক্রিয় (প্রতি ${INTERVAL_MINUTES} মিনিট অন্তর স্বয়ংক্রিয় পর্যবেক্ষণ)...`);
triggerCrawl();
setInterval(triggerCrawl, INTERVAL_MINUTES * 60 * 1000);