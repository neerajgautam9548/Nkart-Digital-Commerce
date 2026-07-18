import { useState } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { sendMessage } from "../services/chatApi";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text:
        "👋 Welcome to Nkarinida AI! I'm your personal shopping assistant. I can help you discover products, recommend the best deals, compare items, track your orders, answer your shopping questions, and make your shopping experience fast and easy. How can I assist you today?",
    },
  ]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const reply = await sendMessage(userMessage);

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text:
            "❌ Nkarinida AI couldn't complete your request right now. Please try again in a few moments."
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          title="Smart Shopping Assistant • Online 24/7"
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: 25,
            right: 25,
            width: 65,
            height: 65,
            borderRadius: "50%",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(37,99,235,.4)",
            zIndex: 9999,
          }}
        >
          <MessageCircle className="ml-4" size={30} />
        </button>
      )}

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 380,
            height: 600,
            background: "#fff",
            borderRadius: 20,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 20px 50px rgba(0,0,0,.25)",
            zIndex: 9999,
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(90deg,#2563eb,#4f46e5)",
              color: "#fff",
              padding: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Bot size={26} />
              <div>
                <div style={{ fontWeight: "bold", fontSize: "18px" }}>
                  🛒 ShopEase AI
                </div>

                <small style={{ opacity: 0.9 }}>
                  AI Shopping Assistant • Online
                </small>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <X />
            </button>
          </div>

          {/* Messages */}
          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 15,
              background: "#f4f7fb",
            }}
          >
            {/* Quick Actions */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "20px",
              }}
            >
              {[
                "🔥 Trending Products",
                "🛍️ Shop by Category",
                "📦 Track My Order",
                "🚚 Delivery Information",
                "💳 Payment Support",
                "🎁 Today's Offers",
                "⭐ Best Sellers",
                "🔄 Returns & Refunds",
              ].map((item) => (
                <button
                  key={item}
                  onClick={async () => {
                    setMessages((prev) => [
                      ...prev,
                      { sender: "user", text: item },
                    ]);

                    setLoading(true);

                    try {
                      const reply = await sendMessage(item);

                      setMessages((prev) => [
                        ...prev,
                        { sender: "bot", text: reply },
                      ]);
                    } catch {
                      setMessages((prev) => [
                        ...prev,
                        {
                          sender: "bot",
                          text: "❌ Nkarinida AI is temporarily unavailable. Please try again shortly.",
                        },
                      ]);
                    }

                    setLoading(false);
                  }}
                  style={{
                    border: "none",
                    background: "#eef4ff",
                    color: "#2563eb",
                    padding: "8px 12px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    gap: "8px",
                    maxWidth: "80%",
                  }}
                >
                  {msg.sender === "bot" && (
                    <Bot size={22} color="#2563eb" />
                  )}

                  <div
                    style={{
                      background:
                        msg.sender === "user"
                          ? "linear-gradient(135deg,#2563eb,#4f46e5)"
                          : "#fff",
                      color: msg.sender === "user" ? "#fff" : "#222",
                      padding: "12px 16px",
                      borderRadius: "18px",
                      boxShadow: "0 2px 8px rgba(0,0,0,.08)",
                      lineHeight: "1.5",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.text}
                  </div>

                  {msg.sender === "user" && (
                    <User size={22} color="#2563eb" />
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  color: "#666",
                }}
              >
                <Bot size={20} color="#2563eb" />
                <span>🤖 Nkarinida AI is finding the best products for you...</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: 15,
              borderTop: "1px solid #eee",
              display: "flex",
              gap: 10,
            }}
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSend()
              }
              placeholder="Ask Nkarinida AI... (e.g. Best laptops under ₹50,000)"
              style={{
                color: "black",
                backgroundColor: "white",
                flex: 1,
                padding: "10px 15px",

                borderRadius: 10,
                border: "1px solid #ddd",
                outline: "none",
              }}
            />

            <button
              onClick={handleSend}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                width: 50,
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              <Send className="ml-3" size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;