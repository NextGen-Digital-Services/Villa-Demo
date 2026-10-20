"use client";

import * as React from "react";
import { Review } from "@/types";
import { reviewService } from "@/services/reviewService";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ReviewsTable } from "@/components/admin/ReviewsTable";
import { showToast } from "@/hooks/useToast";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [loading, setLoading] = React.useState(true);

  const loadReviews = () => {
    reviewService.getAllReviews().then((res) => {
      setReviews(res);
      setLoading(false);
    });
  };

  React.useEffect(() => {
    loadReviews();
  }, []);

  const handleUpdateStatus = async (id: string, status: "approved" | "hidden") => {
    await reviewService.updateReviewStatus(id, status);
    showToast("Review Moderated", `Review status changed to ${status}.`, "info");
    loadReviews();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this guest review?")) {
      await reviewService.deleteReview(id);
      showToast("Review Deleted", "Review removed from system.", "info");
      loadReviews();
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Guest Testimonials & Accolades"
        subtitle="Review moderation, verified guest badge approval, and ratings"
      />

      {loading ? (
        <div className="py-20 text-center font-serif italic text-stone-soft">Loading reviews...</div>
      ) : (
        <ReviewsTable
          reviews={reviews}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
