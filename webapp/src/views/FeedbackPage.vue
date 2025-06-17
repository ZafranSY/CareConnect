<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto px-4">
      <div class="card">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Share What's on Your Mind</h1>
          <p class="text-gray-600">This is a safe and private space for you to express your feelings, thoughts, or experiences without judgment.</p>
          <p class="text-gray-600 mt-2">Just getting things off your chest can often help. Feel free to share whatever you need to.</p>
        </div>

        <form @submit.prevent="submitFeeling" class="space-y-6">
          <div>
            <label for="feeling-message" class="form-label">What are you feeling today?</label>
            <textarea
              id="feeling-message"
              v-model="userFeeling"
              required
              rows="10"
              class="form-input"
              placeholder="Type your feelings here... There's no right or wrong way to feel."
            ></textarea>
            <small class="text-gray-500 mt-1 block">Your message will be anonymous unless you choose to include identifying details within your text.</small>
          </div>

          <div class="flex justify-center">
            <button
              type="submit"
              :disabled="loading || !userFeeling.trim()"
              class="btn btn-primary"
              style="padding: 0.75rem 2rem; font-size: 1.125rem;"
            >
              <span v-if="loading">Sharing...</span>
              <span v-else>Share My Feelings</span>
            </button>
          </div>
        </form>

        <div v-if="submitted" class="alert alert-success">
          <div class="flex">
            <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">Thank you for sharing!</h3>
              <p class="text-sm text-green-700 mt-1">Your feelings matter. We're here to listen.</p>
              <p class="text-sm text-green-700 mt-1">If you need immediate support, please remember to reach out to a professional or a trusted individual.</p>
            </div>
          </div>
        </div>

        <div v-if="error" class="alert alert-error">
          <div class="flex">
            <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Oops! Something went wrong.</h3>
              <p class="text-sm text-red-700 mt-1">We couldn't process your message. Please try again or check your internet connection.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'FeedbackPage', // Keeping the page name
  data() {
    return {
      userFeeling: '', // Renamed from 'form.message' for clarity
      submitted: false
    }
  },
  computed: {
    ...mapState(['loading', 'error'])
  },
  methods: {
    ...mapActions({
      submitFeelingAction: 'submitFeeling' // Map the action with a new local name if needed, or directly 'submitFeedback' if your store action is generic
    }),

    async submitFeeling() {
      if (!this.userFeeling.trim()) {
        // Prevent submission if the textarea is empty or only contains whitespace
        return;
      }
      try {
        // You'll need to update your Vuex action 'submitFeedback' to accept just the message or adapt as needed.
        // For now, let's assume it can handle a single string or an object with a 'message' key.
        await this.submitFeelingAction({ message: this.userFeeling, type: 'emotional-expression' }); // Adding a 'type' for categorization on the backend
        this.submitted = true;
        this.userFeeling = ''; // Clear the textarea after successful submission

        // Hide success message after 7 seconds, slightly longer for a calming effect
        setTimeout(() => {
          this.submitted = false;
        }, 7000);
      } catch (error) {
        console.error('Error submitting feeling:', error);
        // The error state from Vuex will handle showing the error message
      }
    }
  }
}
</script>

<style scoped>
/* Assuming your existing .card, .form-label, .form-input, .btn, .alert styles are defined elsewhere or globally */
/* You might want to add specific styles if the 'card' or 'alert' classes are not already defined. */

.card {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 1rem;
  color: #374151;
  background-color: #ffffff;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-input:focus {
  border-color: #3b82f6; /* Tailwind blue-500 */
  outline: 0;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); /* Tailwind blue-500 with opacity */
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, color 0.15s ease-in-out;
}

.btn-primary {
  background-color: #3b82f6; /* Tailwind blue-500 */
  color: #ffffff;
  border: 1px solid transparent;
}

.btn-primary:hover {
  background-color: #2563eb; /* Tailwind blue-600 */
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.alert {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.375rem;
  border-width: 1px;
}

.alert-success {
  background-color: #d1fae5; /* Tailwind green-100 */
  border-color: #34d399; /* Tailwind green-400 */
}

.alert-error {
  background-color: #fee2e2; /* Tailwind red-100 */
  border-color: #ef4444; /* Tailwind red-400 */
}
</style>