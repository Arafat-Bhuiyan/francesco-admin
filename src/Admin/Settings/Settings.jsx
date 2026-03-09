

import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
  Loader2,
  Save,
  Pencil
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import General from "./General";
import Cargo from "./Cargo";

import toast, { Toaster } from "react-hot-toast";
import { useGetUpdatedDataQuery, useUpdateTermsAndPoliciesMutation } from "@/redux/features/baseApi";

export default function TermsAndPolicies() {
  const [activeTab, setActiveTab] = useState("general");
  const [isEditing, setIsEditing] = useState(false);
  const [fontSize, setFontSize] = useState("14");

  const { data: serverData, isLoading: isFetching } = useGetUpdatedDataQuery();
  const [updateTerms, { isLoading: isUpdating }] = useUpdateTermsAndPoliciesMutation();

  // Local state for all content
  const [content, setContent] = useState({
    terms: "",
    privacy: "",
  });

  const [editContent, setEditContent] = useState("");
  const editorRef = useRef(null);

  // Sync server data to local state
  useEffect(() => {
    if (serverData) {
      setContent({
        terms: serverData.terms_and_conditions || "",
        privacy: serverData.privacy_policy || "",
      });
    }
  }, [serverData]);

  // Handle local state when tab changes
  useEffect(() => {
    if (activeTab === "terms") setEditContent(content.terms);
    if (activeTab === "privacy") setEditContent(content.privacy);
  }, [activeTab, content]);

  // Clean paste handling for the editor
  useEffect(() => {
    const el = editorRef.current;
    if (!el || !isEditing) return;
    const handlePaste = (e) => {
      e.preventDefault();
      const text = e.clipboardData?.getData("text/plain") ?? "";
      document.execCommand("insertText", false, text);
    };
    el.addEventListener("paste", handlePaste);
    return () => el.removeEventListener("paste", handlePaste);
  }, [isEditing]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    const html = editorRef.current?.innerHTML ?? editContent;

    // Prepare payload based on backend keys
    const payload = {};
    if (activeTab === "terms") payload.terms_and_conditions = html;
    if (activeTab === "privacy") payload.privacy_policy = html;

    try {
      await updateTerms({ terms: payload }).unwrap();
      toast.success(`${activeTab === "terms" ? "Terms" : "Privacy Policy"} updated!`);
      setIsEditing(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save changes");
    }
  };

  const handleCancelEdit = () => {
    setEditContent(activeTab === "terms" ? content.terms : content.privacy);
    setIsEditing(false);
  };

  const applyFormat = (command, value) => {
    if (editorRef.current && isEditing) {
      document.execCommand(command, false, value);
      editorRef.current.focus();
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[#FF67C2CC]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-6  mx-auto">

      <div className="py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-100">
          <div className="flex gap-8">
            {["general", "cargo", "terms", "privacy"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`pb-4 text-sm font-bold transition-all capitalize ${activeTab === tab
                  ? "text-[#FF67C2CC] border-b-2 border-[#FF67C2CC]"
                  : "text-gray-400 hover:text-gray-600"
                  }`}
              >
                {tab === "terms" ? "Terms & Conditions" : tab === "privacy" ? "Privacy Policy" : tab}
              </button>
            ))}
          </div>

          {!isEditing && (activeTab === "terms" || activeTab === "privacy") && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 mb-2 py-2 bg-[#FF67C2CC] text-white font-bold rounded-full hover:shadow-lg hover:shadow-pink-200 transition-all text-sm"
            >
              <Pencil size={14} /> Edit Content
            </button>
          )}
        </div>

        {/* Dynamic Content Rendering */}
        <div className="mt-4">
          {activeTab === "general" && <General />}
          {activeTab === "cargo" && <Cargo />}

          {(activeTab === "terms" || activeTab === "privacy") && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              {isEditing ? (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  {/* Text Editor Toolbar */}
                  <div className="flex items-center flex-wrap gap-3 mb-6 p-3 bg-gray-50 rounded-2xl border border-gray-100">


                    <div className="w-px h-6 bg-gray-200 mx-2" />

                    <div className="flex gap-1">
                      <button onClick={() => applyFormat("bold")} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Bold"><Bold size={16} /></button>
                      <button onClick={() => applyFormat("italic")} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Italic"><Italic size={16} /></button>
                      <button onClick={() => applyFormat("underline")} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Underline"><Underline size={16} /></button>
                    </div>

                    <div className="w-px h-6 bg-gray-200 mx-2" />

                    <div className="flex gap-1">
                      <button onClick={() => applyFormat("justifyLeft")} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Align Left"><AlignLeft size={16} /></button>
                      <button onClick={() => applyFormat("justifyCenter")} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Align Center"><AlignCenter size={16} /></button>
                      <button onClick={() => applyFormat("justifyRight")} className="p-2 hover:bg-white hover:shadow-sm rounded-lg transition-all" title="Align Right"><AlignRight size={16} /></button>
                    </div>
                  </div>

                  {/* Editable Area */}
                  <div
                    ref={editorRef}
                    contentEditable
                    suppressContentEditableWarning
                    className="min-h-[500px] p-8 border-2 border-dashed border-gray-100 rounded-3xl focus:outline-none focus:border-[#FF67C2CC]/30 bg-white text-gray-800 leading-relaxed overflow-y-auto"
                    style={{ fontSize: `${fontSize}px` }}
                    dangerouslySetInnerHTML={{ __html: editContent }}
                  />

                  {/* Actions */}
                  <div className="flex gap-4 mt-8 justify-end">
                    <button
                      onClick={handleCancelEdit}
                      className="px-8 py-3 bg-gray-50 text-gray-500 font-bold rounded-full hover:bg-gray-100 transition-all text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isUpdating}
                      onClick={handleSaveEdit}
                      className="flex items-center gap-2 px-10 py-3 bg-[#FF67C2CC] text-white font-bold rounded-full hover:shadow-xl hover:shadow-pink-200 transition-all text-sm disabled:opacity-50"
                    >
                      {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save size={16} />}
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose prose-pink max-w-none animate-in fade-in duration-500">
                  <div
                    className="text-gray-600 leading-loose p-4"
                    dangerouslySetInnerHTML={{ __html: activeTab === "terms" ? content.terms : content.privacy }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}