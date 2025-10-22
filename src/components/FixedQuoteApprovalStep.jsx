import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { CheckCircle, ArrowLeft, Calculator, CreditCard, Clock, Users } from 'lucide-react'

export default function FixedQuoteApprovalStep({ projectData, onApproval, onBack }) {
  const [paymentModel, setPaymentModel] = useState('subscription')
  const [isApproved, setIsApproved] = useState(false)

  // Calculate estimated costs based on usage tier
  const calculateCosts = () => {
    const usageTier = projectData?.usageTier || 'lite'
    const description = projectData?.description || ''
    
    // Estimate complexity based on description length and keywords
    const complexityKeywords = ['dashboard', 'analytics', 'integration', 'automation', 'ai', 'machine learning']
    const hasComplexKeywords = complexityKeywords.some(keyword => 
      description.toLowerCase().includes(keyword)
    )
    
    let baseTokens = 50000 // Base for lite
    let monthlyCost = 7 // Buy Me A Coffee tier
    
    if (usageTier === 'medium') {
      baseTokens = 250000
      monthlyCost = 19 // LITE tier
    } else if (usageTier === 'heavy') {
      baseTokens = 600000
      monthlyCost = 59 // MEDIUM tier
    }
    
    // Adjust for complexity
    if (hasComplexKeywords) {
      baseTokens *= 1.5
      if (usageTier === 'lite' && hasComplexKeywords) {
        monthlyCost = 19 // Bump to LITE tier
      }
    }
    
    const buildCost = Math.round((baseTokens / 1000) * 0.02 * 1.4) // 40% markup
    const setupFee = usageTier === 'heavy' ? 25 : 0
    
    return {
      buildCost,
      monthlyCost,
      setupFee,
      estimatedTokens: baseTokens,
      deliveryTime: usageTier === 'lite' ? 'Instant - 2 hours' : usageTier === 'medium' ? '2-8 hours' : '8-24 hours'
    }
  }

  const costs = calculateCosts()

  const handleApproval = () => {
    setIsApproved(true)
    if (onApproval) {
      onApproval({
        approved: true,
        paymentModel,
        costs,
        projectData
      })
    }
  }

  if (isApproved) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl text-green-600">Quote Approved!</CardTitle>
          <CardDescription>
            Your plug is now in the deployment queue. You'll receive updates via email.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Next Steps:</h3>
            <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
              <li>• ACHEEVY will begin development immediately</li>
              <li>• You'll receive progress updates every 2 hours</li>
              <li>• Testing and deployment will be completed within {costs.deliveryTime}</li>
              <li>• You'll receive deployment credentials and documentation</li>
            </ul>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
              Start New Project
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Quote Approval</h1>
          <p className="text-gray-600 dark:text-gray-400">Review and approve your plug deployment</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-5 w-5" />
              <span>Project Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</label>
              <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mt-1">
                {projectData?.description || 'No description provided'}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Usage Tier</label>
                <Badge variant="outline" className="mt-1 block w-fit">
                  {projectData?.usageTier || 'lite'} use
                </Badge>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Delivery Time</label>
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">{costs.deliveryTime}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Estimated Complexity</label>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                {projectData?.complexity || 'Medium'} - Based on description analysis
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5" />
              <span>Cost Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Build Cost (One-time)</span>
                <span className="font-medium">${costs.buildCost}</span>
              </div>
              
              {costs.setupFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-sm">Setup Fee</span>
                  <span className="font-medium">${costs.setupFee}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-sm">Monthly Subscription</span>
                <span className="font-medium">${costs.monthlyCost}/month</span>
              </div>
              
              <hr className="my-2" />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Total Initial Cost</span>
                <span>${costs.buildCost + costs.setupFee}</span>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Includes:</strong> Development, testing, deployment, documentation, and 30-day support
              </p>
            </div>

            {/* Payment Model Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Model</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="subscription"
                    checked={paymentModel === 'subscription'}
                    onChange={(e) => setPaymentModel(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Monthly Subscription (Recommended)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="one-time"
                    checked={paymentModel === 'one-time'}
                    onChange={(e) => setPaymentModel(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">One-time Payment (+50% premium)</span>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approval Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Ready to Deploy?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                By approving, you agree to the terms and authorize ACHEEVY to begin development.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={onBack}>
                Modify Request
              </Button>
              <Button onClick={handleApproval} className="bg-green-600 hover:bg-green-700">
                Approve & Deploy
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

