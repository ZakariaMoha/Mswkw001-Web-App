export function generateWhatsAppMessage(
  items: Array<{ name: string; quantity: number; price: number }>,
  customerInfo: { name: string; address: string }
): string {
  const itemsList = items
    .map(item => `- ${item.name} (x${item.quantity})`)
    .join('\n');
  
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const message = `Assalamu Alaikum Miswak World 🌿

I'd like to order:
${itemsList}

Total: PKR ${total}

Customer Details:
Name: ${customerInfo.name}
Address: ${customerInfo.address}

JazakAllahu Khairan!`;

  return encodeURIComponent(message);
}

export function getWhatsAppURL(message: string): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return `https://wa.me/${phoneNumber}?text=${message}`;
}