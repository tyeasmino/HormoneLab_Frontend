import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Plus } from "lucide-react";

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

const maxDescriptionLength = 255;

const AddLabServiceModal = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    test_name: "",
    test_category: "",
    test_description: "",
    test_sample: "",
    test_reporting: "",
    patient_rate: "",
  });
  const [loading, setLoading] = useState(false);

  const descriptionLength = formData.test_description?.length || 0;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (descriptionLength > maxDescriptionLength) {
      toast.error("Description is too long. Please keep it under 255 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://hormone-lab-backend.vercel.app/executives/lab-services/",
        formData
      );
      toast.success("New lab service added!");
      onAdd(res.data);
      setFormData({
        test_name: "",
        test_category: "",
        test_description: "",
        test_sample: "",
        test_reporting: "",
        patient_rate: "",
      });
      setOpen(false);
    } catch (err) {
      toast.error("Failed to add lab service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-2 items-center">
          <Plus className="w-4 h-4" /> Add Lab Service
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Lab Service</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div>
            <Label>Test Name</Label>
            <Input
              value={formData.test_name}
              onChange={e => handleChange("test_name", e.target.value)}
            />
          </div>

          <div>
            <Label>Test Category</Label>
            <Select
              value={formData.test_category}
              onValueChange={val => handleChange("test_category", val)}
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
            <Textarea
              rows="4"
              value={formData.test_description}
              onChange={e => handleChange("test_description", e.target.value)}
              className={descriptionLength > maxDescriptionLength ? "border-red-500" : ""}
            />
            <div className={`text-sm mt-1 ${descriptionLength > maxDescriptionLength ? 'text-red-500' : 'text-gray-500'}`}>
              {descriptionLength} / {maxDescriptionLength} characters used
            </div>
          </div>

          <div>
            <Label>Sample</Label>
            <Select
              value={formData.test_sample}
              onValueChange={val => handleChange("test_sample", val)}
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
              value={formData.test_reporting}
              onValueChange={val => handleChange("test_reporting", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reporting" />
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
              value={formData.patient_rate}
              onChange={e => handleChange("patient_rate", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Add Service"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddLabServiceModal;
