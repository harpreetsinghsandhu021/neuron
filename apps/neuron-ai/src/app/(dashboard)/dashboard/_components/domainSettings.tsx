"use client";

import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Break } from "./dashboard";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import ChatbotSettings from "./chatbotSettings";
import BotTraining from "./botTraining";
import ProductsTable from "./tables";
import { CardTitle } from "@/components/ui/card";
import { ChatbotType } from "@/actions/chatbot/types";
import { helpDeskType } from "@/actions/helpdesk/types";
import { filterQuestionType } from "@/actions/botQuestions/types";
import { productType } from "@/actions/products/types";

interface DomainSettingsProps {
  domain:
    | {
        id: number;
        name: string;
      }
    | null
    | undefined;
  chatbot: (ChatbotType & { id: number }) | null | undefined;
  helpDesk: helpDeskType[] | null | undefined;
  filteredQuestions: { question: string; answer: string | null }[] | undefined;
  products: productType[] | undefined;
}

const DomainSettings = ({
  domain,
  chatbot,
  helpDesk,
  filteredQuestions,
  products,
}: DomainSettingsProps) => {
  return (
    <div className="my-4">
      <Tabs defaultValue="settings" className="flex-[0.6]">
        <Break />

        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="chatbot-settings">Chatbot Settings</TabsTrigger>
          <TabsTrigger value="bot-training">Bot Training</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
        </TabsList>
        <Break />
        <TabsContent className="flex flex-col gap-4" value="settings">
          <div className="items-center">
            <CardTitle>Domain Name</CardTitle>
            <Input
              disabled
              defaultValue={domain?.name}
              className="max-w-64 mt-2"
            />
          </div>
          <div>
            <CardTitle>Code Snippet</CardTitle>{" "}
            <Tabs defaultValue="html" className="flex-[0.6] mt-2">
              <TabsList className="max-w-2xl grid w-full grid-cols-3">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="next">Next</TabsTrigger>
              </TabsList>
              <TabsContent value="html">
                <p className="text-sm capitalize my-2 text-gray-400 text-muted-foreground ">
                  Copy and paste this code snippet into the header tag of your
                  website
                </p>
                <CodeBlock id={domain?.id} />
              </TabsContent>
              <TabsContent value="react">
                <p className="text-sm my-2 capitalize text-gray-400 text-muted-foreground ">
                  create a file in src/components/chatFrame.tsx and paste the
                  following code
                </p>
                <ReactCodeBlock id={domain?.id} />
                <p className="text-sm my-2 capitalize text-gray-400 text-muted-foreground ">
                  import chatComponent in layout.tsx
                </p>
                <LayoutCodeBlock />
              </TabsContent>
              <TabsContent value="next">
                <p className="text-sm my-2 capitalize text-gray-400 text-muted-foreground ">
                  create a file in src/components/chatFrame.tsx and paste the
                  following code
                </p>
                <ReactCodeBlock id={domain?.id} />
                <p className="text-sm my-2 capitalize text-gray-400 text-muted-foreground ">
                  import chatComponent in layout.tsx
                </p>
                <LayoutCodeBlock />
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>
        <TabsContent value="chatbot-settings">
          <ChatbotSettings
            icon={chatbot?.icon}
            id={chatbot?.id}
            helpdesk={chatbot?.helpDesk}
            greetingMessage={chatbot?.welcomeMessage}
          />
        </TabsContent>
        <TabsContent value="bot-training">
          <BotTraining
            id={domain?.id}
            helpDesk={helpDesk}
            filteredQuestions={filteredQuestions}
          />
        </TabsContent>
        <TabsContent value="products">
          <ProductsTable products={products} id={domain?.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

function CodeBlock({ id }: { id: number | undefined }) {
  let snippet = `
    const iframe = document.createElement("iframe");
    
    const iframeStyles = (styleString) => {
    const style = document.createElement('style');
    style.textContent = styleString;
    document.head.append(style);
    }
    
    iframeStyles(\`
        .chat-frame {
          position: fixed;
          bottom: 50px;
          right: 50px;
          border: none;
          height:100vh;
          width:540px;
        }
    \`)
    
    iframe.src = "${process.env.NEXT_PUBLIC_CHATBOT_URL}"
    iframe.classList.add('chat-frame')
    document.body.appendChild(iframe)

    iframe.onload = () => {
      setTimeout(() => {
        try {
          iframe.contentWindow.postMessage(${id}, "${process.env.NEXT_PUBLIC_CHATBOT_URL}");
        } catch (err) {
          console.error("Error sending postMessage:", err);
        }
      }, 100);
    };
    
    window.addEventListener("message", (e) => {
        if(e.origin !== "http://localhost:3000") return null
        let dimensions = JSON.parse(e.data)
        iframe.width = dimensions.width
        iframe.height = dimensions.height
        iframe.contentWindow.postMessage("${id}", "${process.env.NEXT_PUBLIC_CHATBOT_URL}")
    })
        `;
  return (
    <div className="grid w-[45rem] relative bg-gray-100 dark:bg-gray-800 rounded-xl">
      <Copy
        className="absolute top-5 right-5 text-gray-400 cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(snippet);
          toast("Copied to clipboard", {
            description: "You can now paste the code inside your website",
          });
        }}
      />
      <pre className="w-full overflow-scroll">
        <code className="text-gray-500 dark:text-gray-400">{snippet}</code>
      </pre>
    </div>
  );
}

function ReactCodeBlock({ id }: { id: number | undefined }) {
  let snippet = `
  "use client";
  import { useRef, useEffect } from "react";
  
  interface Dimensions {
    width: number;
    height: number;
  }
  
  const ChatFrame = () => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
  
    useEffect(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;
  
      const iframeStyles = (styleString: string) => {
        const style = document.createElement("style");
        style.textContent = styleString;
        document.head.appendChild(style);
      };
  
      iframeStyles(\`
        .chat-frame {
          position: fixed;
          right:0;
          bottom:0;
          border: none;
          height: 95vh;
          width:540px;
          z-index:99;
          pointer-events:all;
        }
      \`);
  
      iframe.src = "${process.env.NEXT_PUBLIC_CHATBOT_URL}"; 
      iframe.classList.add("chat-frame");
  
      iframe.onload = () => {
        setTimeout(() => {
          try {
            iframe.contentWindow?.postMessage(${id}, "${process.env.NEXT_PUBLIC_CHATBOT_URL}"); 
          } catch (err) {
            console.error("Error sending postMessage:", err);
          }
        }, 100);
      };

  
      window.addEventListener("message", handleMessage);
  
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }, []);
  
    return (
      <iframe
        ref={iframeRef}
        src=""
        style={{ colorScheme: "normal" }}
        className="chat-frame"
      ></iframe>
    );
  };
  
  export default ChatFrame;
  
        `;
  return (
    <div className="grid w-[45rem] relative bg-gray-100 dark:bg-gray-800 rounded-xl ">
      <Copy
        className="absolute top-5 right-5 text-gray-400 cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(snippet);
          toast("Copied to clipboard", {
            description: "You can now paste the code inside your website",
          });
        }}
      />
      <pre className="w-full overflow-scroll">
        <code className="text-gray-500 dark:text-gray-400">{snippet}</code>
      </pre>
    </div>
  );
}

function LayoutCodeBlock() {
  let snippet = `
  import ChatFrame from "./_components/chatFrame";
  import { Footer } from "./_components/footer";
  import { Navbar } from "./_components/navbar";
  
  const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="dark:bg-[#1F1F1F]">
        <Navbar />
        <ChatFrame />
        <main className="pt-40">{children}</main>
        <Footer />
      </div>
    );
  };
  
  export default Layout;
  
        `;
  return (
    <div className="grid w-[45rem] relative bg-gray-100 dark:bg-gray-800 rounded-xl">
      <Copy
        className="absolute top-5 right-5 text-gray-400 cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(snippet);
          toast("Copied to clipboard", {
            description: "You can now paste the code inside your website",
          });
        }}
      />
      <pre className="w-full overflow-scroll">
        <code className="text-gray-500 dark:text-gray-400">{snippet}</code>
      </pre>
    </div>
  );
}

export default DomainSettings;
