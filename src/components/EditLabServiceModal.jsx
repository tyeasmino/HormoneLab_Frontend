import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Pencil } from "lucide-react";
import axios from "axios";

const TEST_CATEGORY_CHOICES = [
    "BIOCHEMICAL TEST",
    "REPRODUCTIVE HORMONE",
    "URINE ANALYSIS",
    "KIDNEY FUNCTION TEST (KFT)",
    "SPECIAL BIOCHEMICAL TEST",
    "METABOLIC HORMONE",
    "CANCER MARKER",
    "LIVER FUNCTION TEST (LFT)",
];

const SAMPLE_CHOICES = [
    "Serum",
    "Pus",
    "Blood (EDTA Tube)",
    "Blood (PT Tube)",
    "Blood (RBS Tube)",
    "Blood (Red Tube)",
    "Body Fluid",
    "Urine",
];

const REPORTING_CHOICES = [
    "One Day",
    "Two Days",
    "Three Days",
    "Four Days",
    "Five Days",
    "Seven Days",
    "Ten Days",
];


const EditLabServiceModal = ({ test, onUpdate }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ ...test });
    const controls = useAnimation();

    const [loading, setLoading] = useState(false);
    const maxDescriptionLength = 255;
    const descriptionLength = formData.test_description?.length || 0;

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };


    const handleSubmit = async () => {
        setLoading(true);

        if (formData.test_description?.length > maxDescriptionLength) {
            toast.error("Description is too long. Please keep it under 255 characters.");
            return;
        }



        try {
            const res = await axios.patch(
                `https://hormone-lab-backend.vercel.app/executives/lab-services/${test.id}/`,
                formData
            );
            toast.success("Lab service updated successfully!");
            onUpdate(res.data);
            setOpen(false);
        } catch (err) {
            toast.error("Update failed. Please check input.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <Pencil className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Lab Service</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                    <div>
                        <Label>Test Name</Label>
                        <Input
                            value={formData.test_name || ""}
                            onChange={e => handleChange("test_name", e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Test Category</Label>
                        <Select
                            value={formData.test_category || ""}
                            onValueChange={value => handleChange("test_category", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {TEST_CATEGORY_CHOICES.map(option => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Description</Label>
                        <motion.textarea
                            rows="4"
                            value={formData.test_description || ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= maxDescriptionLength) {
                                    handleChange("test_description", value);
                                } else {
                                    // Trigger shake
                                    controls.start({
                                        x: [0, -5, 5, -5, 5, 0],
                                        transition: { duration: 0.4 },
                                    });
                                }
                            }}
                            className={`w-full bg-transparent p-2 border rounded-md transition-all duration-200 ${descriptionLength > maxDescriptionLength ? "border-red-500" : ""
                                }`}
                            animate={controls}
                        />

                        <div className={`text-sm mt-1 ${descriptionLength > maxDescriptionLength ? 'text-red-500' : 'text-gray-500'}`}>
                            {descriptionLength} / {maxDescriptionLength} characters used
                            {descriptionLength > maxDescriptionLength && " — Too long!"}
                        </div>
                    </div>


                    <div>
                        <Label>Sample</Label>
                        <Select
                            value={formData.test_sample || ""}
                            onValueChange={value => handleChange("test_sample", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select sample" />
                            </SelectTrigger>
                            <SelectContent>
                                {SAMPLE_CHOICES.map(option => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Reporting</Label>
                        <Select
                            value={formData.test_reporting || ""}
                            onValueChange={value => handleChange("test_reporting", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select reporting time" />
                            </SelectTrigger>
                            <SelectContent>
                                {REPORTING_CHOICES.map(option => (
                                    <SelectItem key={option} value={option}>
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Patient Rate</Label>
                        <Input
                            type="number"
                            value={formData.patient_rate || ""}
                            onChange={e => handleChange("patient_rate", e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditLabServiceModal;
