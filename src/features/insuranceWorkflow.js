/*
 * ============================================================
 * STALLIFS INSURANCE WORKFLOW
 * ============================================================
 *
 * Matches the existing application routes.
 *
 * API requests remain inside feature/page files.
 * This file contains workflow state, navigation and helpers only.
 * ============================================================
 */


/* ============================================================
   ROUTES
============================================================ */

export const INSURANCE_ROUTES = {
  home: "/",

  register: "/register",
  login: "/login",

  products: "/products",

  productDetails: (productId) =>
    `/products/${productId}`,

  getQuote: "/quote",
  quoteResult: "/quote",

  apply: "/applications",

  applications: "/applications",

  applicationDetails: (applicationId) =>
    `/applications/${applicationId}`,

  payment: (applicationId) =>
    `/payments?application=${encodeURIComponent(applicationId)}`,

  paymentStatus: (applicationId) =>
    `/payments?application=${encodeURIComponent(applicationId)}`,

  policies: "/policies",

  policyDetails: (policyId) =>
    `/policies/${policyId}`,

  dashboard: "/dashboard",

  profile: "/settings",

  settings: "/settings",

  search: "/search",

  agent: "/agent",

  agentProfile: "/agent/profile",

  agentAnalytics: "/agent/analytics",

  agentCommissions: "/agent/commissions",

  admin: "/admin",

  adminApplications: "/admin/applications",

  adminPolicies: "/admin/policies",

  adminQuotes: "/admin/quotes",

  adminPayments: "/admin/payments",

  adminClaims: "/admin/claims",

  adminAnalytics: "/admin/analytics",

  adminAuditLogs: "/admin/audit-logs",

  adminUnderwriting: (applicationId) =>
    `/admin/underwriting/${applicationId}`,

  adminReassignment: "/admin/reassignment",

  adminAgentApplications:
    "/admin/agent-applications",

  adminAgentApplicationDetails: (applicationId) =>
    `/admin/agent-applications/${applicationId}`,
};


/* ============================================================
   ENTRY POINTS
============================================================ */

export const WORKFLOW_ENTRY_POINTS = {
  REGISTER: "register",
  PRODUCTS: "products",
  GET_QUOTE: "get_quote",
};


/* ============================================================
   WORKFLOW STEPS
============================================================ */

export const WORKFLOW_STEPS = {
  REGISTER: "register",
  LOGIN: "login",

  PRODUCTS: "products",
  PRODUCT_DETAILS: "product_details",

  GET_QUOTE: "get_quote",
  QUOTE_RESULT: "quote_result",

  APPLY: "apply",

  APPLICATION_REVIEW: "application_review",
  MORE_DETAILS: "more_details",
  APPROVED: "approved",
  REJECTED: "rejected",

  PAYMENT: "payment",
  PAYMENT_PENDING: "payment_pending",
  PAYMENT_SUCCESS: "payment_success",
  PAYMENT_FAILED: "payment_failed",

  POLICY_ACTIVE: "policy_active",

  AGENT_ASSIGNMENT: "agent_assignment",
};


/* ============================================================
   APPLICATION STATUS
============================================================ */

export const APPLICATION_STATUS = {
  DRAFT: "draft",
  SUBMITTED: "submitted",
  UNDER_REVIEW: "under_review",
  MORE_DETAILS_REQUIRED: "more_details_required",
  APPROVED: "approved",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
};


/* ============================================================
   PAYMENT STATUS
============================================================ */

export const PAYMENT_STATUS = {
  PENDING: "pending",
  SUCCESS: "success",
  FAILED: "failed",
};


/* ============================================================
   POLICY STATUS
============================================================ */

export const POLICY_STATUS = {
  PENDING_PAYMENT: "pending_payment",
  ACTIVE: "active",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
  SUSPENDED: "suspended",
};


/* ============================================================
   AGENT STATUS
============================================================ */

export const AGENT_STATUS = {
  NOT_REQUIRED: "not_required",
  PENDING: "pending",
  ASSIGNED: "assigned",
};


/* ============================================================
   WORKFLOW DEFINITION
============================================================ */

export const WORKFLOW_DEFINITION = [
  {
    id: WORKFLOW_STEPS.REGISTER,
    title: "Create Account",
    route: INSURANCE_ROUTES.register,
    requiresAuthentication: false,
  },

  {
    id: WORKFLOW_STEPS.LOGIN,
    title: "Login",
    route: INSURANCE_ROUTES.login,
    requiresAuthentication: false,
  },

  {
    id: WORKFLOW_STEPS.PRODUCTS,
    title: "Insurance Products",
    route: INSURANCE_ROUTES.products,
    requiresAuthentication: false,
  },

  {
    id: WORKFLOW_STEPS.PRODUCT_DETAILS,
    title: "Product Details",
    route: INSURANCE_ROUTES.productDetails,
    requiresAuthentication: false,
  },

  {
    id: WORKFLOW_STEPS.GET_QUOTE,
    title: "Get a Quote",
    route: INSURANCE_ROUTES.getQuote,
    requiresAuthentication: false,
  },

  {
    id: WORKFLOW_STEPS.QUOTE_RESULT,
    title: "Quote Result",
    route: INSURANCE_ROUTES.quoteResult,
    requiresAuthentication: false,
  },

  {
    id: WORKFLOW_STEPS.APPLY,
    title: "Apply Now",
    route: INSURANCE_ROUTES.apply,
    requiresAuthentication: true,
  },

  {
    id: WORKFLOW_STEPS.APPLICATION_REVIEW,
    title: "Application Review",
    route: INSURANCE_ROUTES.applications,
    requiresAuthentication: true,
  },

  {
    id: WORKFLOW_STEPS.MORE_DETAILS,
    title: "More Details Required",
    route: INSURANCE_ROUTES.applications,
    requiresAuthentication: true,
  },

  {
    id: WORKFLOW_STEPS.APPROVED,
    title: "Application Approved",
    route: INSURANCE_ROUTES.applications,
    requiresAuthentication: true,
  },

  {
    id: WORKFLOW_STEPS.REJECTED,
    title: "Application Rejected",
    route: INSURANCE_ROUTES.applications,
    requiresAuthentication: true,
  },

  {
    id: WORKFLOW_STEPS.PAYMENT,
    title: "Payment",
    route: INSURANCE_ROUTES.payment,
    requiresAuthentication: true,
  },

  {
    id: WORKFLOW_STEPS.PAYMENT_PENDING,
    title: "Payment Pending",
    route: INSURANCE_ROUTES.paymentStatus,
    requiresAuthentication: true,
  },

  {
    id: WORKFLOW_STEPS.PAYMENT_SUCCESS,
    title: "Payment Successful",
    route: INSURANCE_ROUTES.paymentStatus,
    requiresAuthentication: true,
  },

  {
    id: WORKFLOW_STEPS.PAYMENT_FAILED,
    title: "Payment Failed",
    route: INSURANCE_ROUTES.paymentStatus,
    requiresAuthentication: true,
  },

  {
    id: WORKFLOW_STEPS.POLICY_ACTIVE,
    title: "Policy Active",
    route: INSURANCE_ROUTES.policies,
    requiresAuthentication: true,
  },

  {
    id: WORKFLOW_STEPS.AGENT_ASSIGNMENT,
    title: "Agent Assignment",
    route: INSURANCE_ROUTES.policies,
    requiresAuthentication: true,
  },
];


/* ============================================================
   WORKFLOWS
============================================================ */

export const PUBLIC_WORKFLOW = [
  WORKFLOW_STEPS.PRODUCTS,
  WORKFLOW_STEPS.PRODUCT_DETAILS,
  WORKFLOW_STEPS.GET_QUOTE,
  WORKFLOW_STEPS.QUOTE_RESULT,
  WORKFLOW_STEPS.APPLY,
];


export const REGISTER_WORKFLOW = [
  WORKFLOW_STEPS.REGISTER,
  WORKFLOW_STEPS.LOGIN,
  WORKFLOW_STEPS.PRODUCTS,
  WORKFLOW_STEPS.PRODUCT_DETAILS,
  WORKFLOW_STEPS.GET_QUOTE,
  WORKFLOW_STEPS.QUOTE_RESULT,
  WORKFLOW_STEPS.APPLY,
];


export const QUOTE_WORKFLOW = [
  WORKFLOW_STEPS.GET_QUOTE,
  WORKFLOW_STEPS.QUOTE_RESULT,
  WORKFLOW_STEPS.APPLY,
];


export const APPLICATION_WORKFLOW = [
  WORKFLOW_STEPS.APPLY,
  WORKFLOW_STEPS.APPLICATION_REVIEW,
  WORKFLOW_STEPS.MORE_DETAILS,
  WORKFLOW_STEPS.APPROVED,
  WORKFLOW_STEPS.REJECTED,
  WORKFLOW_STEPS.PAYMENT,
  WORKFLOW_STEPS.PAYMENT_PENDING,
  WORKFLOW_STEPS.PAYMENT_SUCCESS,
  WORKFLOW_STEPS.PAYMENT_FAILED,
  WORKFLOW_STEPS.POLICY_ACTIVE,
  WORKFLOW_STEPS.AGENT_ASSIGNMENT,
];


/* ============================================================
   NORMALIZATION
============================================================ */

export const normalizeStatus = (status) => {
  if (!status) {
    return "";
  }

  return String(status)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/-/g, "_");
};


export const normalizeRole = (role) => {
  if (!role) {
    return "";
  }

  return String(role)
    .trim()
    .toLowerCase();
};


/* ============================================================
   AUTHENTICATION
============================================================ */

export const requiresLoginForApplication = (
  isAuthenticated
) => {
  return isAuthenticated;
};


/* ============================================================
   PRODUCT → QUOTE
============================================================ */

export const getProductDetailsRoute = (
  productId
) => {
  if (!productId) {
    return INSURANCE_ROUTES.products;
  }

  return INSURANCE_ROUTES.productDetails(
    productId
  );
};


export const getQuoteRoute = ({
  productId,
} = {}) => {
  if (!productId) {
    return INSURANCE_ROUTES.getQuote;
  }

  return `${INSURANCE_ROUTES.getQuote}?product=${encodeURIComponent(
    productId
  )}`;
};


/* ============================================================
   QUOTE → APPLICATION
============================================================ */

export const getApplyRoute = ({
  quoteId,
  productId,
} = {}) => {
  const params = new URLSearchParams();

  if (quoteId) {
    params.set("quote", quoteId);
  }

  if (productId) {
    params.set("product", productId);
  }

  const query = params.toString();

  return query
    ? `${INSURANCE_ROUTES.apply}?${query}`
    : INSURANCE_ROUTES.apply;
};


/* ============================================================
   APPLICATION ROUTES
============================================================ */

export const getApplicationRoute = (
  applicationId
) => {
  if (!applicationId) {
    return INSURANCE_ROUTES.applications;
  }

  return INSURANCE_ROUTES.applicationDetails(
    applicationId
  );
};


export const getPaymentRoute = (
  applicationId
) => {
  if (!applicationId) {
    return INSURANCE_ROUTES.applications;
  }

  return INSURANCE_ROUTES.payment(
    applicationId
  );
};


/* ============================================================
   POLICY ROUTES
============================================================ */

export const getPolicyRoute = (
  policyId
) => {
  if (!policyId) {
    return INSURANCE_ROUTES.policies;
  }

  return INSURANCE_ROUTES.policyDetails(
    policyId
  );
};


/* ============================================================
   APPLICATION → NEXT ACTION
============================================================ */

export const getApplicationNextAction = (
  application
) => {
  if (!application) {
    return {
      type: "browse",
      label: "View Insurance Products",
      route: INSURANCE_ROUTES.products,
    };
  }

  const status = normalizeStatus(
    application.status
  );

  switch (status) {
    case APPLICATION_STATUS.DRAFT:
      return {
        type: "continue_application",
        label: "Continue Application",
        route: getApplicationRoute(
          application._id
        ),
      };

    case APPLICATION_STATUS.SUBMITTED:
    case APPLICATION_STATUS.UNDER_REVIEW:
      return {
        type: "wait",
        label: "Application Under Review",
        route: getApplicationRoute(
          application._id
        ),
      };

    case APPLICATION_STATUS.MORE_DETAILS_REQUIRED:
      return {
        type: "provide_details",
        label: "Provide More Details",
        route: getApplicationRoute(
          application._id
        ),
      };

    case APPLICATION_STATUS.APPROVED:
      return {
        type: "pay",
        label: "Pay Now",
        route: getPaymentRoute(
          application._id
        ),
      };

    case APPLICATION_STATUS.REJECTED:
    case APPLICATION_STATUS.CANCELLED:
      return {
        type: "closed",
        label: "View Application",
        route: getApplicationRoute(
          application._id
        ),
      };

    default:
      return {
        type: "view",
        label: "View Application",
        route: getApplicationRoute(
          application._id
        ),
      };
  }
};


/* ============================================================
   PAYMENT → NEXT ACTION
============================================================ */

export const getPaymentNextAction = (
  payment,
  application
) => {
  const status = normalizeStatus(
    payment?.status
  );

  const applicationId =
    payment?.application ||
    application?._id;

  switch (status) {
    case PAYMENT_STATUS.SUCCESS:
      return {
        type: "policy",
        label: "View Policy",
        route: INSURANCE_ROUTES.policies,
      };

    case PAYMENT_STATUS.FAILED:
      return {
        type: "retry_payment",
        label: "Retry Payment",
        route: getPaymentRoute(
          applicationId
        ),
      };

    case PAYMENT_STATUS.PENDING:
      return {
        type: "payment_pending",
        label: "Check Payment Status",
        route: getPaymentRoute(
          applicationId
        ),
      };

    default:
      return {
        type: "make_payment",
        label: "Make Payment",
        route: getPaymentRoute(
          applicationId
        ),
      };
  }
};


/* ============================================================
   POLICY → NEXT ACTION
============================================================ */

export const getPolicyNextAction = (
  policy
) => {
  if (!policy) {
    return {
      type: "applications",
      label: "View Applications",
      route: INSURANCE_ROUTES.applications,
    };
  }

  const status = normalizeStatus(
    policy.status
  );

  switch (status) {
    case POLICY_STATUS.PENDING_PAYMENT:
      return {
        type: "payment",
        label: "Complete Payment",
        route: getPaymentRoute(
          policy.application
        ),
      };

    case POLICY_STATUS.ACTIVE:
      return {
        type: "policy",
        label: "View Active Policy",
        route: getPolicyRoute(
          policy._id
        ),
      };

    default:
      return {
        type: "policy",
        label: "View Policy",
        route: getPolicyRoute(
          policy._id
        ),
      };
  }
};


/* ============================================================
   AGENT ASSIGNMENT
============================================================ */

export const requiresAgentAssignment = (
  policy
) => {
  if (!policy) {
    return false;
  }

  if (policy.agentRequired !== undefined) {
    return Boolean(
      policy.agentRequired
    );
  }

  if (
    policy.agent ||
    policy.agentId ||
    policy.assignedAgent
  ) {
    return false;
  }

  return false;
};


export const getAgentAssignmentStatus = (
  policy
) => {
  if (!policy) {
    return AGENT_STATUS.NOT_REQUIRED;
  }

  if (
    policy.agent ||
    policy.agentId ||
    policy.assignedAgent
  ) {
    return AGENT_STATUS.ASSIGNED;
  }

  if (policy.agentRequired) {
    return AGENT_STATUS.PENDING;
  }

  return AGENT_STATUS.NOT_REQUIRED;
};


/* ============================================================
   CUSTOMER WORKFLOW STATE
============================================================ */

export const getCustomerWorkflowState = ({
  isAuthenticated = false,
  quote = null,
  application = null,
  payment = null,
  policy = null,
} = {}) => {
  if (policy) {
    const policyStatus = normalizeStatus(
      policy.status
    );

    if (
      policyStatus ===
      POLICY_STATUS.ACTIVE
    ) {
      const agentStatus =
        getAgentAssignmentStatus(
          policy
        );

      if (
        agentStatus ===
        AGENT_STATUS.PENDING
      ) {
        return {
          step:
            WORKFLOW_STEPS.AGENT_ASSIGNMENT,
          label:
            "Agent assignment pending",
          route:
            INSURANCE_ROUTES.policies,
          agentStatus,
        };
      }

      return {
        step:
          WORKFLOW_STEPS.POLICY_ACTIVE,
        label: "Policy active",
        route: getPolicyRoute(
          policy._id
        ),
        agentStatus,
      };
    }

    if (
      policyStatus ===
      POLICY_STATUS.PENDING_PAYMENT
    ) {
      return {
        step:
          WORKFLOW_STEPS.PAYMENT_PENDING,
        label: "Payment required",
        route: getPaymentRoute(
          policy.application
        ),
      };
    }
  }


  if (payment) {
    const paymentStatus =
      normalizeStatus(
        payment.status
      );

    const applicationId =
      payment.application ||
      application?._id;

    if (
      paymentStatus ===
      PAYMENT_STATUS.SUCCESS
    ) {
      return {
        step:
          WORKFLOW_STEPS.PAYMENT_SUCCESS,
        label: "Payment successful",
        route: INSURANCE_ROUTES.policies,
      };
    }

    if (
      paymentStatus ===
      PAYMENT_STATUS.FAILED
    ) {
      return {
        step:
          WORKFLOW_STEPS.PAYMENT_FAILED,
        label: "Payment failed",
        route: getPaymentRoute(
          applicationId
        ),
      };
    }

    return {
      step:
        WORKFLOW_STEPS.PAYMENT_PENDING,
      label: "Payment pending",
      route: getPaymentRoute(
        applicationId
      ),
    };
  }


  if (application) {
    const status =
      normalizeStatus(
        application.status
      );

    const route =
      getApplicationRoute(
        application._id
      );

    if (
      status ===
      APPLICATION_STATUS.MORE_DETAILS_REQUIRED
    ) {
      return {
        step:
          WORKFLOW_STEPS.MORE_DETAILS,
        label: "More details required",
        route,
      };
    }

    if (
      status ===
      APPLICATION_STATUS.APPROVED
    ) {
      return {
        step:
          WORKFLOW_STEPS.APPROVED,
        label: "Application approved",
        route: getPaymentRoute(
          application._id
        ),
      };
    }

    if (
      status ===
      APPLICATION_STATUS.REJECTED
    ) {
      return {
        step:
          WORKFLOW_STEPS.REJECTED,
        label: "Application rejected",
        route,
      };
    }

    if (
      status ===
        APPLICATION_STATUS.SUBMITTED ||
      status ===
        APPLICATION_STATUS.UNDER_REVIEW
    ) {
      return {
        step:
          WORKFLOW_STEPS.APPLICATION_REVIEW,
        label:
          "Application under review",
        route,
      };
    }

    if (
      status ===
      APPLICATION_STATUS.DRAFT
    ) {
      return {
        step:
          WORKFLOW_STEPS.APPLY,
        label:
          "Continue application",
        route,
      };
    }
  }


  if (quote) {
    return {
      step:
        WORKFLOW_STEPS.QUOTE_RESULT,
      label: "Quote ready",
      route: INSURANCE_ROUTES.quoteResult,
    };
  }


  return {
    step:
      WORKFLOW_STEPS.PRODUCTS,
    label:
      "Choose an insurance product",
    route:
      INSURANCE_ROUTES.products,
    isAuthenticated,
  };
};


/* ============================================================
   AUTHENTICATION NAVIGATION
============================================================ */

export const getPostRegistrationRoute = ({
  isAuthenticated = false,
} = {}) => {
  return isAuthenticated
    ? INSURANCE_ROUTES.products
    : INSURANCE_ROUTES.login;
};


export const getPostLoginRoute = () => {
  return INSURANCE_ROUTES.products;
};


/* ============================================================
   PRODUCT NAVIGATION
============================================================ */

export const getPostProductRoute = (
  productId
) => {
  return getProductDetailsRoute(
    productId
  );
};


export const getPostProductDetailsRoute = (
  productId
) => {
  return getQuoteRoute({
    productId,
  });
};


/* ============================================================
   QUOTE NAVIGATION
============================================================ */

export const getPostQuoteRoute = ({
  quoteId,
  productId,
  isAuthenticated = false,
} = {}) => {
  if (!isAuthenticated) {
    const params = new URLSearchParams();

    if (quoteId) {
      params.set("quote", quoteId);
    }

    if (productId) {
      params.set("product", productId);
    }

    params.set(
      "returnTo",
      INSURANCE_ROUTES.apply
    );

    return `${INSURANCE_ROUTES.login}?${params.toString()}`;
  }

  return getApplyRoute({
    quoteId,
    productId,
  });
};


/* ============================================================
   APPLICATION NAVIGATION
============================================================ */

export const getPostApplicationRoute = (
  application
) => {
  if (!application) {
    return INSURANCE_ROUTES.applications;
  }

  return getApplicationRoute(
    application._id
  );
};


export const getPostAdminDecisionRoute = (
  application
) => {
  if (!application) {
    return INSURANCE_ROUTES.applications;
  }

  const status =
    normalizeStatus(
      application.status
    );

  switch (status) {
    case APPLICATION_STATUS.APPROVED:
      return getPaymentRoute(
        application._id
      );

    default:
      return getApplicationRoute(
        application._id
      );
  }
};


/* ============================================================
   PAYMENT NAVIGATION
============================================================ */

export const getPostPaymentRoute = ({
  payment,
  policy,
  application,
} = {}) => {
  const status =
    normalizeStatus(
      payment?.status
    );

  if (
    status ===
    PAYMENT_STATUS.SUCCESS
  ) {
    return policy
      ? getPolicyRoute(policy._id)
      : INSURANCE_ROUTES.policies;
  }

  return getPaymentRoute(
    payment?.application ||
      application?._id
  );
};


/* ============================================================
   WORKFLOW PROGRESS
============================================================ */

export const getWorkflowProgress = (
  currentStep
) => {
  const orderedSteps = [
    WORKFLOW_STEPS.PRODUCTS,
    WORKFLOW_STEPS.PRODUCT_DETAILS,
    WORKFLOW_STEPS.GET_QUOTE,
    WORKFLOW_STEPS.QUOTE_RESULT,
    WORKFLOW_STEPS.APPLY,
    WORKFLOW_STEPS.APPLICATION_REVIEW,
    WORKFLOW_STEPS.APPROVED,
    WORKFLOW_STEPS.PAYMENT,
    WORKFLOW_STEPS.PAYMENT_SUCCESS,
    WORKFLOW_STEPS.POLICY_ACTIVE,
    WORKFLOW_STEPS.AGENT_ASSIGNMENT,
  ];

  const currentIndex =
    orderedSteps.indexOf(
      currentStep
    );

  if (currentIndex === -1) {
    return {
      current: 0,
      total: orderedSteps.length,
      percentage: 0,
    };
  }

  return {
    current: currentIndex + 1,
    total: orderedSteps.length,
    percentage: Math.round(
      ((currentIndex + 1) /
        orderedSteps.length) *
        100
    ),
  };
};


/* ============================================================
   LABELS
============================================================ */

export const WORKFLOW_LABELS = {
  [WORKFLOW_STEPS.REGISTER]:
    "Create your account",

  [WORKFLOW_STEPS.LOGIN]:
    "Login to continue",

  [WORKFLOW_STEPS.PRODUCTS]:
    "Choose insurance",

  [WORKFLOW_STEPS.PRODUCT_DETAILS]:
    "Review product",

  [WORKFLOW_STEPS.GET_QUOTE]:
    "Get your quote",

  [WORKFLOW_STEPS.QUOTE_RESULT]:
    "Review your quote",

  [WORKFLOW_STEPS.APPLY]:
    "Submit application",

  [WORKFLOW_STEPS.APPLICATION_REVIEW]:
    "Application under review",

  [WORKFLOW_STEPS.MORE_DETAILS]:
    "More information required",

  [WORKFLOW_STEPS.APPROVED]:
    "Application approved",

  [WORKFLOW_STEPS.REJECTED]:
    "Application rejected",

  [WORKFLOW_STEPS.PAYMENT]:
    "Complete payment",

  [WORKFLOW_STEPS.PAYMENT_PENDING]:
    "Payment pending",

  [WORKFLOW_STEPS.PAYMENT_SUCCESS]:
    "Payment successful",

  [WORKFLOW_STEPS.PAYMENT_FAILED]:
    "Payment failed",

  [WORKFLOW_STEPS.POLICY_ACTIVE]:
    "Policy active",

  [WORKFLOW_STEPS.AGENT_ASSIGNMENT]:
    "Agent assignment",
};


/* ============================================================
   MESSAGES
============================================================ */

export const WORKFLOW_MESSAGES = {
  applicationSubmitted:
    "Your application has been submitted and is now being reviewed.",

  applicationUnderReview:
    "Your application is currently being reviewed by STALLIFS.",

  moreDetailsRequired:
    "STALLIFS needs additional information before your application can be approved.",

  applicationApproved:
    "Your application has been approved. Complete payment to activate your policy.",

  applicationRejected:
    "Your application was not approved. Please review the application details for more information.",

  paymentPending:
    "Your M-PESA payment is being processed. Please wait for confirmation.",

  paymentSuccess:
    "Payment successful. Your policy is being activated.",

  paymentFailed:
    "Your payment was not completed. You can retry the payment.",

  policyActive:
    "Your policy is active.",

  agentAssignmentPending:
    "Your policy is active and an agent is being assigned where required.",
};


/* ============================================================
   WORKFLOW GUARD
============================================================ */

export const canAccessWorkflowStep = ({
  step,
  isAuthenticated = false,
  application = null,
  payment = null,
  policy = null,
} = {}) => {
  switch (step) {
    case WORKFLOW_STEPS.REGISTER:
    case WORKFLOW_STEPS.LOGIN:
    case WORKFLOW_STEPS.PRODUCTS:
    case WORKFLOW_STEPS.PRODUCT_DETAILS:
    case WORKFLOW_STEPS.GET_QUOTE:
    case WORKFLOW_STEPS.QUOTE_RESULT:
      return true;

    case WORKFLOW_STEPS.APPLY:
      return Boolean(isAuthenticated);

    case WORKFLOW_STEPS.APPLICATION_REVIEW:
    case WORKFLOW_STEPS.MORE_DETAILS:
    case WORKFLOW_STEPS.APPROVED:
    case WORKFLOW_STEPS.REJECTED:
      return Boolean(
        isAuthenticated &&
          application
      );

    case WORKFLOW_STEPS.PAYMENT:
    case WORKFLOW_STEPS.PAYMENT_PENDING:
    case WORKFLOW_STEPS.PAYMENT_SUCCESS:
    case WORKFLOW_STEPS.PAYMENT_FAILED:
      return Boolean(
        isAuthenticated &&
          (application || payment)
      );

    case WORKFLOW_STEPS.POLICY_ACTIVE:
    case WORKFLOW_STEPS.AGENT_ASSIGNMENT:
      return Boolean(
        isAuthenticated &&
          policy
      );

    default:
      return false;
  }
};


/* ============================================================
   CONTINUE WORKFLOW
============================================================ */

export const continueInsuranceWorkflow = ({
  isAuthenticated = false,
  quote = null,
  application = null,
  payment = null,
  policy = null,
} = {}) => {
  return getCustomerWorkflowState({
    isAuthenticated,
    quote,
    application,
    payment,
    policy,
  });
};


/* ============================================================
   WORKFLOW CONTEXT
============================================================ */

export const getWorkflowContext = ({
  productId = null,
  quoteId = null,
  applicationId = null,
  paymentId = null,
  policyId = null,
} = {}) => {
  return {
    productId,
    quoteId,
    applicationId,
    paymentId,
    policyId,
  };
};


/* ============================================================
   BUILD WORKFLOW URL
============================================================ */

export const buildWorkflowUrl = ({
  step,
  productId,
  quoteId,
  applicationId,
  policyId,
} = {}) => {
  switch (step) {
    case WORKFLOW_STEPS.REGISTER:
      return INSURANCE_ROUTES.register;

    case WORKFLOW_STEPS.LOGIN:
      return INSURANCE_ROUTES.login;

    case WORKFLOW_STEPS.PRODUCTS:
      return INSURANCE_ROUTES.products;

    case WORKFLOW_STEPS.PRODUCT_DETAILS:
      return getProductDetailsRoute(
        productId
      );

    case WORKFLOW_STEPS.GET_QUOTE:
      return getQuoteRoute({
        productId,
      });

    case WORKFLOW_STEPS.QUOTE_RESULT:
      return INSURANCE_ROUTES.quoteResult;

    case WORKFLOW_STEPS.APPLY:
      return getApplyRoute({
        quoteId,
        productId,
      });

    case WORKFLOW_STEPS.APPLICATION_REVIEW:
    case WORKFLOW_STEPS.MORE_DETAILS:
    case WORKFLOW_STEPS.APPROVED:
    case WORKFLOW_STEPS.REJECTED:
      return getApplicationRoute(
        applicationId
      );

    case WORKFLOW_STEPS.PAYMENT:
    case WORKFLOW_STEPS.PAYMENT_PENDING:
    case WORKFLOW_STEPS.PAYMENT_SUCCESS:
    case WORKFLOW_STEPS.PAYMENT_FAILED:
      return getPaymentRoute(
        applicationId
      );

    case WORKFLOW_STEPS.POLICY_ACTIVE:
    case WORKFLOW_STEPS.AGENT_ASSIGNMENT:
      return getPolicyRoute(
        policyId
      );

    default:
      return INSURANCE_ROUTES.products;
  }
};


/* ============================================================
   DEFAULT EXPORT
============================================================ */

const insuranceWorkflow = {
  routes: INSURANCE_ROUTES,

  entryPoints:
    WORKFLOW_ENTRY_POINTS,

  steps: WORKFLOW_STEPS,

  applicationStatus:
    APPLICATION_STATUS,

  paymentStatus:
    PAYMENT_STATUS,

  policyStatus:
    POLICY_STATUS,

  agentStatus:
    AGENT_STATUS,

  definition:
    WORKFLOW_DEFINITION,

  publicWorkflow:
    PUBLIC_WORKFLOW,

  registerWorkflow:
    REGISTER_WORKFLOW,

  quoteWorkflow:
    QUOTE_WORKFLOW,

  applicationWorkflow:
    APPLICATION_WORKFLOW,

  labels:
    WORKFLOW_LABELS,

  messages:
    WORKFLOW_MESSAGES,

  getCustomerWorkflowState,

  getApplicationNextAction,

  getPaymentNextAction,

  getPolicyNextAction,

  getAgentAssignmentStatus,

  requiresAgentAssignment,

  getWorkflowProgress,

  canAccessWorkflowStep,

  continueInsuranceWorkflow,

  getWorkflowContext,

  buildWorkflowUrl,

  getProductDetailsRoute,

  getQuoteRoute,

  getApplyRoute,

  getApplicationRoute,

  getPaymentRoute,

  getPolicyRoute,

  getPostRegistrationRoute,

  getPostLoginRoute,

  getPostProductRoute,

  getPostProductDetailsRoute,

  getPostQuoteRoute,

  getPostApplicationRoute,

  getPostAdminDecisionRoute,

  getPostPaymentRoute,
};

export default insuranceWorkflow;