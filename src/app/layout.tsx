import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/sections/root-layout/header/header";
import { SessionProvider } from "next-auth/react";
import { ModalProvider } from "@/components/modal/context/modalContext";
import { ToastContainer } from "react-toastify";
import Modal from "@/components/modal/modal";
import { modalTypes } from "@/components/modal/types/modalTypes";
import ProfileUserModalContainer from "@/sections/user/form/profile/profile-user-form-modal-container";
import VerifyCodeFormModalContainer from "@/sections/auth/form/verify-code/verify-code-form-modal-container";
import ChangePasswordForgotFormModalContainer from "@/sections/auth/form/change-password-forgot/change-password-forgot-form-modal-container";
import ProgressBar from "@/components/providers/progress-bar.";
import { User } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fast-Inspection",
  description: "Plataforma para la inspección técnica de edificaciones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ModalProvider>
            <ToastContainer />
            <ProgressBar>
              <main className="flex bg-background min-h-screen flex-col">
                <Header />
                {children}
                <Modal
                  formPath={modalTypes.profileUserModal.name}
                  title={modalTypes.profileUserModal.title}
                  maxWidth="max-w-3xl"
                  className="min-h-[60vh]"
                  icon={<User />}
                >
                  <ProfileUserModalContainer />
                </Modal>

                <Modal
                  formPath={modalTypes.verifyCodeModal.name}
                  title={modalTypes.verifyCodeModal.title}
                  maxWidth="max-w-2xl"
                  icon={<User />}
                >
                  <VerifyCodeFormModalContainer />
                </Modal>

                <Modal
                  formPath={modalTypes.changePasswordForgotModal.name}
                  title={modalTypes.changePasswordForgotModal.title}
                  maxWidth="max-w-lg"
                  icon={<User />}
                >
                  <ChangePasswordForgotFormModalContainer />
                </Modal>
              </main>
            </ProgressBar>
          </ModalProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
