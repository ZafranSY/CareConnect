<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto px-4">
      <div class="card">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Something on your mind?</h1>
          <p class="text-gray-600">Let us know how we can help improve our services</p>
        </div>
        
        <form @submit.prevent="submitFeedback" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="firstName" class="form-label">First Name *</label>
              <input
                type="text"
                id="firstName"
                v-model="form.firstName"
                required
                class="form-input"
                placeholder="Enter your first name"
              />
            </div>
            
            <div>
              <label for="lastName" class="form-label">Last Name *</label>
              <input
                type="text"
                id="lastName"
                v-model="form.lastName"
                required
                class="form-input"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          
          <div>
            <label for="email" class="form-label">Email *</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              required
              class="form-input"
              placeholder="Enter your email address"
            />
          </div>
          
          <div>
            <label for="contactNo" class="form-label">Contact Number</label>
            <input
              type="tel"
              id="contactNo"
              v-model="form.contactNo"
              class="form-input"
              placeholder="Enter your contact number (optional)"
            />
          </div>
          
          <div>
            <label for="message" class="form-label">Message *</label>
            <textarea
              id="message"
              v-model="form.message"
              required
              rows="6"
              class="form-input"
              placeholder="Share your thoughts, suggestions, or concerns..."
            ></textarea>
          </div>
          
          <div class="flex justify-center">
            <button
              type="submit"
              :disabled="loading"
              class="btn btn-primary"
              style="padding: 0.75rem 2rem; font-size: 1.125rem;"
            >
              <span v-if="loading">Submitting...</span>
              <span v-else>Submit Feedback</span>
            </button>
          </div>
        </form>
        
        <!-- Success Message -->
        <div v-if="submitted" class="alert alert-success">
          <div class="flex">
            <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-green-800">Feedback Submitted Successfully!</h3>
              <p class="text-sm text-green-700 mt-1">Thank you for your feedback. We'll review it and get back to you if needed.</p>
            </div>
          </div>
        </div>
        
        <!-- Error Message -->
        <div v-if="error" class="alert alert-error">
          <div class="flex">
            <svg class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-red-800">Error Submitting Feedback</h3>
              <p class="text-sm text-red-700 mt-1">{{ error }}</p>
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
  name: 'FeedbackPage',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        contactNo: '',
        message: ''
      },
      submitted: false
    }
  },
  computed: {
    ...mapState(['loading', 'error'])
  },
  methods: {
    ...mapActions(['submitFeedback']),
    
    async submitFeedback() {
      try {
        await this.submitFeedback(this.form)
        this.submitted = true
        this.resetForm()
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.submitted = false
        }, 5000)
      } catch (error) {
        console.error('Error submitting feedback:', error)
      }
    },
    
    resetForm() {
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        contactNo: '',
        message: ''
      }
    }
  }
}
</script>
