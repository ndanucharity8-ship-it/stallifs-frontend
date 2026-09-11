import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";

import stallifsLogo from "../../../assets/logos/stallifs_logo.png";

import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  ShieldCheck,
} from "../../../shared/icons";

import { Button } from "../../../shared/ui";
import api from "../../../shared/api/axios";

/* =========================================================
   FORMATTING HELPERS
========================================================= */

const formatCurrency = (amount) => {
  if (
    amount === null ||
    amount === undefined ||
    amount === ""
  ) {
    return "—";
  }

  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(Number(amount));
};


const formatNumber = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  return Number(value).toLocaleString("en-KE", {
    maximumFractionDigits: 2,
  });
};


const formatRate = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  return `${(Number(value) * 100).toFixed(2)}%`;
};


const formatBreakdownLabel = (key) => {
  const labels = {
    vehicleValue: "Vehicle value",
    vehicleAge: "Vehicle age",
    coverType: "Cover type",
    baseRate: "Premium rate",
    basePremium: "Base premium",
    minimumPremium: "Minimum premium",
    minimumPremiumApplied:
      "Minimum premium applied",
    members: "Number of members",
    coverAmount: "Cover amount",
    travellers: "Number of travellers",
    duration: "Trip duration",
    dailyRate: "Daily rate",
    businessValue: "Business value",
    propertyValue: "Property value",
  };

  return (
    labels[key] ||
    key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (letter) =>
        letter.toUpperCase()
      )
  );
};


const formatBreakdownValue = (key, value) => {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  if (key === "coverType") {
    return String(value)
      .replace(/_/g, " ")
      .replace(/^./, (letter) =>
        letter.toUpperCase()
      );
  }

  if (
    key === "baseRate" ||
    key === "rate"
  ) {
    return formatRate(value);
  }

  if (
    [
      "vehicleValue",
      "basePremium",
      "minimumPremium",
      "coverAmount",
      "businessValue",
      "propertyValue",
      "dailyRate",
    ].includes(key)
  ) {
    return formatCurrency(value);
  }

  if (
    key === "minimumPremiumApplied"
  ) {
    return value ? "Yes" : "No";
  }

  return formatNumber(value);
};


/* =========================================================
   PRODUCT HELPERS
========================================================= */

const getProductCategory = (product) => {
  return product?.category?.toLowerCase() || "";
};


const getCalculatorFields = (category) => {
  switch (category) {
    case "motor":
      return [
        {
          name: "vehicleValue",
          label: "Vehicle value",
          type: "number",
          placeholder: "e.g. 500000",
          help: "Enter the current estimated value of the vehicle.",
          required: true,
        },
        {
          name: "vehicleAge",
          label: "Vehicle age",
          type: "number",
          placeholder: "e.g. 3",
          help: "How many years old is the vehicle?",
          required: true,
        },
        {
          name: "coverType",
          label: "Cover type",
          type: "select",
          required: true,
          options: [
            {
              value: "comprehensive",
              label: "Comprehensive",
            },
            {
              value: "third_party",
              label: "Third Party",
            },
          ],
        },
      ];

    case "medical":
      return [
        {
          name: "members",
          label: "Number of members",
          type: "number",
          placeholder: "e.g. 2",
          help: "Include yourself and any family members to be covered.",
          required: true,
        },
      ];

    case "life":
      return [
        {
          name: "coverAmount",
          label: "Desired cover amount",
          type: "number",
          placeholder: "e.g. 1000000",
          help: "Enter the amount of life cover you would like.",
          required: true,
        },
      ];

    case "travel":
      return [
        {
          name: "travellers",
          label: "Number of travellers",
          type: "number",
          placeholder: "e.g. 2",
          required: true,
        },
        {
          name: "duration",
          label: "Trip duration",
          type: "number",
          placeholder: "Number of days",
          help: "Enter the number of days you will be travelling.",
          required: true,
        },
      ];

    case "business":
      return [
        {
          name: "businessValue",
          label: "Business value",
          type: "number",
          placeholder: "e.g. 1000000",
          help: "Estimated value of the business/assets you want to protect.",
          required: true,
        },
      ];

    case "property":
      return [
        {
          name: "propertyValue",
          label: "Property value",
          type: "number",
          placeholder: "e.g. 2000000",
          help: "Estimated value of the property.",
          required: true,
        },
      ];

    case "accident":
      return [];

    default:
      return [];
  }
};


/* =========================================================
   CALCULATION EXPLANATION
========================================================= */

const buildCalculationSteps = (
  quote,
  selectedCategory
) => {
  const breakdown =
    quote?.calculation?.breakdown || {};

  const premium = Number(
    quote?.estimatedPremium || 0
  );

  const steps = [];

  /* -------------------------------------------------------
     MOTOR
  ------------------------------------------------------- */

  if (
    selectedCategory === "motor" &&
    breakdown.vehicleValue !== undefined &&
    breakdown.baseRate !== undefined
  ) {
    const vehicleValue = Number(
      breakdown.vehicleValue
    );

    const baseRate = Number(
      breakdown.baseRate
    );

    const calculatedBasePremium =
      vehicleValue * baseRate;

    const basePremium =
      breakdown.basePremium !== undefined
        ? Number(breakdown.basePremium)
        : calculatedBasePremium;

    steps.push({
      label: "Vehicle value",
      value: formatCurrency(
        vehicleValue
      ),
    });

    steps.push({
      label: "Cover type",
      value: formatBreakdownValue(
        "coverType",
        breakdown.coverType
      ),
    });

    steps.push({
      label: "Premium rate",
      value: formatRate(baseRate),
    });

    steps.push({
      label: "Base premium",
      value: formatCurrency(
        basePremium
      ),
      calculation:
        `${formatCurrency(
          vehicleValue
        )} × ${formatRate(
          baseRate
        )} = ${formatCurrency(
          basePremium
        )}`,
    });

    if (
      breakdown.minimumPremium !==
      undefined
    ) {
      const minimumPremium = Number(
        breakdown.minimumPremium
      );

      const minimumApplied =
        breakdown.minimumPremiumApplied !==
        undefined
          ? Boolean(
              breakdown.minimumPremiumApplied
            )
          : basePremium <
            minimumPremium;

      steps.push({
        label: "Minimum premium",
        value: formatCurrency(
          minimumPremium
        ),
      });

      steps.push({
        label: "Minimum premium applied",
        value: minimumApplied
          ? "Yes"
          : "No",
        calculation: minimumApplied
          ? `The calculated premium was below the minimum of ${formatCurrency(
              minimumPremium
            )}, so the minimum premium applies.`
          : `The base premium is above the minimum of ${formatCurrency(
              minimumPremium
            )}, so the calculated base premium applies.`,
      });
    }

    return {
      steps,
      premium,
      category: "motor",
      calculationType: "motor",
    };
  }


  /* -------------------------------------------------------
     TRAVEL
  ------------------------------------------------------- */

  if (
    selectedCategory === "travel" &&
    breakdown.travellers !==
      undefined &&
    breakdown.duration !==
      undefined &&
    breakdown.dailyRate !==
      undefined
  ) {
    const travellers = Number(
      breakdown.travellers
    );

    const duration = Number(
      breakdown.duration
    );

    const dailyRate = Number(
      breakdown.dailyRate
    );

    const calculatedBasePremium =
      travellers *
      duration *
      dailyRate;

    const basePremium =
      breakdown.basePremium !== undefined
        ? Number(breakdown.basePremium)
        : calculatedBasePremium;

    steps.push({
      label: "Number of travellers",
      value: formatNumber(
        travellers
      ),
    });

    steps.push({
      label: "Trip duration",
      value: `${formatNumber(
        duration
      )} day${duration === 1 ? "" : "s"}`,
    });

    steps.push({
      label: "Daily rate",
      value: formatCurrency(
        dailyRate
      ),
    });

    steps.push({
      label: "Base premium",
      value: formatCurrency(
        basePremium
      ),
      calculation:
        `${travellers} × ${duration} × ${formatCurrency(
          dailyRate
        )} = ${formatCurrency(
          basePremium
        )}`,
    });

    return {
      steps,
      premium,
      category: "travel",
      calculationType: "travel",
    };
  }


  /* -------------------------------------------------------
     GENERIC / BACKEND-PROVIDED BREAKDOWN
  ------------------------------------------------------- */

  Object.entries(breakdown).forEach(
    ([key, value]) => {
      steps.push({
        label:
          formatBreakdownLabel(key),
        value:
          formatBreakdownValue(
            key,
            value
          ),
      });
    }
  );

  return {
    steps,
    premium,
    category: selectedCategory,
    calculationType: "generic",
  };
};


/* =========================================================
   COMPONENT
========================================================= */

export default function GetQuote() {
  const [products, setProducts] =
    useState([]);

  const [
    loadingProducts,
    setLoadingProducts,
  ] = useState(true);

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const [quote, setQuote] =
    useState(null);


  const [form, setForm] = useState({
    product: "",
    fullName: "",
    phone: "",
    age: "",
    details: "",

    vehicleValue: "",
    vehicleAge: "",
    coverType: "comprehensive",

    members: "",

    coverAmount: "",

    travellers: "",
    duration: "",

    businessValue: "",

    propertyValue: "",
  });


  /* =======================================================
     LOAD PRODUCTS
  ======================================================= */

  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          setLoadingProducts(true);
          setError("");

          const response =
            await api.get(
              "/products"
            );

          setProducts(
            response.data || []
          );
        } catch (err) {
          setError(
            err.response?.data
              ?.message ||
              "Unable to load insurance products. Please try again."
          );
        } finally {
          setLoadingProducts(false);
        }
      };

    fetchProducts();
  }, []);


  /* =======================================================
     SELECTED PRODUCT
  ======================================================= */

  const selectedProduct =
    useMemo(() => {
      return products.find(
        (product) =>
          product._id ===
          form.product
      );
    }, [
      products,
      form.product,
    ]);


  const selectedCategory =
    getProductCategory(
      selectedProduct
    );


  const calculatorFields =
    getCalculatorFields(
      selectedCategory
    );


  /* =======================================================
     FORM CHANGE
  ======================================================= */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };


  /* =======================================================
     PRODUCT CHANGE
  ======================================================= */

  const handleProductChange =
    (event) => {
      const productId =
        event.target.value;

      setForm((current) => ({
        ...current,

        product: productId,

        vehicleValue: "",
        vehicleAge: "",
        coverType:
          "comprehensive",

        members: "",

        coverAmount: "",

        travellers: "",
        duration: "",

        businessValue: "",

        propertyValue: "",
      }));

      setQuote(null);
      setError("");
    };


  /* =======================================================
     VALIDATE
  ======================================================= */

  const validateForm = () => {
    if (!form.product) {
      return "Please select an insurance product.";
    }

    if (!form.fullName.trim()) {
      return "Please enter your full name.";
    }

    if (!form.phone.trim()) {
      return "Please enter your phone number.";
    }

    if (!form.age) {
      return "Please enter your age.";
    }

    if (
      Number(form.age) < 18 ||
      Number(form.age) > 120
    ) {
      return "Please enter a valid age between 18 and 120.";
    }

    for (
      const field of calculatorFields
    ) {
      if (
        field.required &&
        !form[field.name]
      ) {
        return `Please enter ${field.label.toLowerCase()}.`;
      }

      if (
        field.type === "number" &&
        form[field.name] &&
        Number(form[field.name]) < 0
      ) {
        return `${field.label} cannot be negative.`;
      }
    }

    return "";
  };


  /* =======================================================
     SUBMIT QUOTE
  ======================================================= */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    const validationError =
      validateForm();

    if (validationError) {
      setError(
        validationError
      );
      return;
    }

    try {
      setSubmitting(true);

      const response =
        await api.post(
          "/quotes",
          {
            product:
              form.product,

            fullName:
              form.fullName.trim(),

            phone:
              form.phone.trim(),

            age:
              Number(form.age),

            details:
              form.details.trim(),

            /* Motor */
            ...(selectedCategory ===
              "motor" && {
              vehicleValue:
                Number(
                  form.vehicleValue
                ),

              vehicleAge:
                Number(
                  form.vehicleAge
                ),

              coverType:
                form.coverType,
            }),

            /* Medical */
            ...(selectedCategory ===
              "medical" && {
              members:
                Number(
                  form.members
                ),
            }),

            /* Life */
            ...(selectedCategory ===
              "life" && {
              coverAmount:
                Number(
                  form.coverAmount
                ),
            }),

            /* Travel */
            ...(selectedCategory ===
              "travel" && {
              travellers:
                Number(
                  form.travellers
                ),

              duration:
                Number(
                  form.duration
                ),
            }),

            /* Business */
            ...(selectedCategory ===
              "business" && {
              businessValue:
                Number(
                  form.businessValue
                ),
            }),

            /* Property */
            ...(selectedCategory ===
              "property" && {
              propertyValue:
                Number(
                  form.propertyValue
                ),
            }),
          }
        );

      setQuote(
        response.data
      );
    } catch (err) {
      setError(
        err.response?.data
          ?.message ||
          "We could not calculate your quote. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };


  /* =======================================================
     DOWNLOAD QUOTE PDF
  ======================================================= */

  const handleDownloadQuote =
    async () => {
      if (!quote) return;

      try {
        const doc =
          new jsPDF({
            orientation:
              "portrait",
            unit: "mm",
            format: "a4",
          });

        const pageWidth =
          doc.internal.pageSize.getWidth();

        const pageHeight =
          doc.internal.pageSize.getHeight();

        const margin = 18;

        const primary = [
          24, 62, 48,
        ];

        const secondary = [
          72, 102, 87,
        ];

        const light = [
          244, 247, 245,
        ];

        const border = [
          220, 226, 222,
        ];

        const dark = [
          35, 42, 38,
        ];

        const muted = [
          105, 115, 109,
        ];

        const white = [
          255, 255, 255,
        ];

        const premium = Number(
          quote.estimatedPremium ||
            0
        );

        const productName =
          quote.product?.name ||
          selectedProduct?.name ||
          "Insurance";

        const category =
          quote.product?.category ||
          selectedProduct?.category ||
          "";

        const normalizedCategory =
          category.toLowerCase();

        const breakdown =
          quote.calculation
            ?.breakdown || {};

        const calculationData =
          buildCalculationSteps(
            quote,
            normalizedCategory
          );

        const formattedPremium =
          formatCurrency(
            premium
          );

        const formattedDate =
          new Date().toLocaleDateString(
            "en-KE",
            {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }
          );


        /* -------------------------------------------------
           IMAGE LOADER
        ------------------------------------------------- */

        const loadImage = (
          src
        ) =>
          new Promise(
            (
              resolve,
              reject
            ) => {
              const image =
                new Image();

              image.onload =
                () =>
                  resolve(
                    image
                  );

              image.onerror =
                reject;

              image.src = src;
            }
          );


        /* -------------------------------------------------
           FOOTER
        ------------------------------------------------- */

        const drawFooter = () => {
          doc.setDrawColor(
            ...border
          );

          doc.line(
            margin,
            pageHeight - 25,
            pageWidth - margin,
            pageHeight - 25
          );

          doc.setFont(
            "helvetica",
            "normal"
          );

          doc.setFontSize(8);

          doc.setTextColor(
            ...muted
          );

          doc.text(
            "STALLIFS Insurance",
            margin,
            pageHeight - 16
          );

          doc.text(
            "Insurance made simpler.",
            pageWidth / 2,
            pageHeight - 16,
            {
              align: "center",
            }
          );

          doc.text(
            `Page ${doc.getCurrentPageInfo().pageNumber}`,
            pageWidth - margin,
            pageHeight - 16,
            {
              align: "right",
            }
          );
        };


        /* -------------------------------------------------
           HEADER
        ------------------------------------------------- */

        doc.setFillColor(
          ...primary
        );

        doc.rect(
          0,
          0,
          pageWidth,
          42,
          "F"
        );


        try {
          const logo =
            await loadImage(
              stallifsLogo
            );

          const logoWidth = 42;

          const logoHeight =
            (logo.height /
              logo.width) *
            logoWidth;

          doc.addImage(
            logo,
            "PNG",
            margin,
            8,
            logoWidth,
            logoHeight
          );
        } catch (logoError) {
          console.warn(
            "Could not load STALLIFS logo:",
            logoError
          );

          doc.setTextColor(
            ...white
          );

          doc.setFont(
            "helvetica",
            "bold"
          );

          doc.setFontSize(18);

          doc.text(
            "STALLIFS",
            margin,
            18
          );
        }


        doc.setTextColor(
          ...white
        );

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(8);

        doc.text(
          "INSURANCE",
          margin,
          28
        );


        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(10);

        doc.text(
          "INSURANCE QUOTE",
          pageWidth -
            margin,
          16,
          {
            align: "right",
          }
        );


        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(8);

        doc.text(
          "Initial Premium Estimate",
          pageWidth -
            margin,
          23,
          {
            align: "right",
          }
        );


        /* -------------------------------------------------
           TITLE
        ------------------------------------------------- */

        let y = 57;

        doc.setTextColor(
          ...primary
        );

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(20);

        doc.text(
          "Your Insurance Quote",
          margin,
          y
        );

        y += 8;

        doc.setTextColor(
          ...muted
        );

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(9);

        doc.text(
          "Thank you for choosing STALLIFS Insurance.",
          margin,
          y
        );


        /* -------------------------------------------------
           QUOTE META
        ------------------------------------------------- */

        y += 16;

        doc.setFillColor(
          ...light
        );

        doc.roundedRect(
          margin,
          y,
          pageWidth -
            margin * 2,
          25,
          3,
          3,
          "F"
        );

        doc.setFontSize(8);

        doc.setTextColor(
          ...muted
        );

        doc.text(
          "QUOTE ID",
          margin + 6,
          y + 8
        );

        doc.text(
          "DATE",
          pageWidth / 2,
          y + 8
        );

        doc.setTextColor(
          ...dark
        );

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(9);

        doc.text(
          quote._id || "N/A",
          margin + 6,
          y + 15
        );

        doc.text(
          formattedDate,
          pageWidth / 2,
          y + 15
        );


        /* -------------------------------------------------
           CUSTOMER INFORMATION
        ------------------------------------------------- */

        y += 36;

        doc.setTextColor(
          ...primary
        );

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(11);

        doc.text(
          "Customer Information",
          margin,
          y
        );

        y += 7;

        doc.setDrawColor(
          ...border
        );

        doc.line(
          margin,
          y,
          pageWidth - margin,
          y
        );

        y += 9;

        doc.setFontSize(8);

        doc.setTextColor(
          ...muted
        );

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.text(
          "CUSTOMER",
          margin,
          y
        );

        doc.text(
          "PHONE",
          pageWidth / 2,
          y
        );

        y += 6;

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setTextColor(
          ...dark
        );

        doc.setFontSize(10);

        doc.text(
          form.fullName ||
            "N/A",
          margin,
          y
        );

        doc.text(
          form.phone ||
            "N/A",
          pageWidth / 2,
          y
        );


        /* -------------------------------------------------
           PRODUCT INFORMATION
        ------------------------------------------------- */

        y += 16;

        doc.setTextColor(
          ...primary
        );

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(11);

        doc.text(
          "Insurance Product",
          margin,
          y
        );

        y += 7;

        doc.setDrawColor(
          ...border
        );

        doc.line(
          margin,
          y,
          pageWidth - margin,
          y
        );

        y += 9;

        doc.setFontSize(8);

        doc.setTextColor(
          ...muted
        );

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.text(
          "PRODUCT",
          margin,
          y
        );

        doc.text(
          "CATEGORY",
          pageWidth / 2,
          y
        );

        y += 6;

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setTextColor(
          ...dark
        );

        doc.setFontSize(10);

        doc.text(
          productName,
          margin,
          y
        );

        doc.text(
          category,
          pageWidth / 2,
          y
        );


        /* -------------------------------------------------
           PREMIUM CARD
        ------------------------------------------------- */

        y += 18;

        doc.setFillColor(
          ...primary
        );

        doc.roundedRect(
          margin,
          y,
          pageWidth -
            margin * 2,
          42,
          4,
          4,
          "F"
        );

        doc.setTextColor(
          ...white
        );

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(8);

        doc.text(
          "ESTIMATED PREMIUM",
          margin + 8,
          y + 11
        );

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(24);

        doc.text(
          formattedPremium ||
            "N/A",
          margin + 8,
          y + 28
        );

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(8);

        doc.text(
          "Initial estimate",
          pageWidth -
            margin -
            8,
          y + 14,
          {
            align: "right",
          }
        );

        doc.text(
          "Subject to underwriting",
          pageWidth -
            margin -
            8,
          y + 21,
          {
            align: "right",
          }
        );


        /* -------------------------------------------------
           CALCULATION DETAILS
        ------------------------------------------------- */

        y += 55;

        if (
          calculationData.steps
            .length > 0
        ) {
          doc.setTextColor(
            ...primary
          );

          doc.setFont(
            "helvetica",
            "bold"
          );

          doc.setFontSize(11);

          doc.text(
            "How your premium was calculated",
            margin,
            y
          );

          y += 7;

          doc.setDrawColor(
            ...border
          );

          doc.line(
            margin,
            y,
            pageWidth - margin,
            y
          );

          y += 8;


          calculationData.steps.forEach(
            (step) => {
              /*
               * Keep enough room for footer.
               */
              if (
                y >
                pageHeight - 55
              ) {
                drawFooter();

                doc.addPage();

                y = 25;

                doc.setTextColor(
                  ...primary
                );

                doc.setFont(
                  "helvetica",
                  "bold"
                );

                doc.setFontSize(11);

                doc.text(
                  "How your premium was calculated",
                  margin,
                  y
                );

                y += 10;
              }


              doc.setFont(
                "helvetica",
                "normal"
              );

              doc.setFontSize(9);

              doc.setTextColor(
                ...muted
              );

              doc.text(
                step.label,
                margin,
                y
              );


              doc.setFont(
                "helvetica",
                "bold"
              );

              doc.setTextColor(
                ...dark
              );

              doc.text(
                step.value,
                pageWidth -
                  margin,
                y,
                {
                  align:
                    "right",
                }
              );

              y += 6;


              if (
                step.calculation
              ) {
                doc.setFont(
                  "helvetica",
                  "normal"
                );

                doc.setFontSize(
                  7.5
                );

                doc.setTextColor(
                  ...secondary
                );

                const calculationLines =
                  doc.splitTextToSize(
                    step.calculation,
                    pageWidth -
                      margin * 2 -
                      6
                  );

                doc.text(
                  calculationLines,
                  margin + 3,
                  y
                );

                y +=
                  calculationLines.length *
                  4.5;
              }


              doc.setDrawColor(
                ...border
              );

              doc.line(
                margin,
                y,
                pageWidth -
                  margin,
                y
              );

              y += 6;
            }
          );


          /* -----------------------------------------------
             MOTOR CALCULATION SUMMARY
          ------------------------------------------------ */

          if (
            normalizedCategory ===
              "motor" &&
            breakdown.vehicleValue !==
              undefined &&
            breakdown.baseRate !==
              undefined
          ) {
            const vehicleValue =
              Number(
                breakdown.vehicleValue
              );

            const baseRate =
              Number(
                breakdown.baseRate
              );

            const calculatedBasePremium =
              vehicleValue *
              baseRate;

            const basePremium =
              breakdown.basePremium !==
              undefined
                ? Number(
                    breakdown.basePremium
                  )
                : calculatedBasePremium;

            const minimumPremium =
              breakdown.minimumPremium !==
              undefined
                ? Number(
                    breakdown.minimumPremium
                  )
                : 0;

            const minimumApplied =
              breakdown.minimumPremiumApplied !==
              undefined
                ? Boolean(
                    breakdown.minimumPremiumApplied
                  )
                : basePremium <
                  minimumPremium;


            if (
              y >
              pageHeight - 90
            ) {
              drawFooter();

              doc.addPage();

              y = 25;
            }


            y += 3;

            doc.setFillColor(
              ...light
            );

            doc.roundedRect(
              margin,
              y,
              pageWidth -
                margin * 2,
              38,
              3,
              3,
              "F"
            );


            doc.setFont(
              "helvetica",
              "bold"
            );

            doc.setFontSize(8);

            doc.setTextColor(
              ...primary
            );

            doc.text(
              "CALCULATION SUMMARY",
              margin + 7,
              y + 9
            );


            doc.setFont(
              "helvetica",
              "normal"
            );

            doc.setFontSize(8);

            doc.setTextColor(
              ...dark
            );

            doc.text(
              `${formatCurrency(
                vehicleValue
              )} × ${formatRate(
                baseRate
              )} = ${formatCurrency(
                basePremium
              )}`,
              margin + 7,
              y + 17
            );


            doc.setFontSize(
              7.5
            );

            doc.setTextColor(
              ...muted
            );

            const summaryText =
              minimumApplied
                ? `Minimum premium of ${formatCurrency(
                    minimumPremium
                  )} applies because the calculated premium is lower.`
                : `Base premium exceeds the minimum premium of ${formatCurrency(
                    minimumPremium
                  )}.`;

            const summaryLines =
              doc.splitTextToSize(
                summaryText,
                pageWidth -
                  margin * 2 -
                  14
              );

            doc.text(
              summaryLines,
              margin + 7,
              y + 24
            );


            y += 46;
          }


          /* -----------------------------------------------
             FINAL PREMIUM
          ------------------------------------------------ */

          if (
            y >
            pageHeight - 70
          ) {
            drawFooter();

            doc.addPage();

            y = 25;
          }


          doc.setFillColor(
            ...primary
          );

          doc.roundedRect(
            margin,
            y,
            pageWidth -
              margin * 2,
            30,
            3,
            3,
            "F"
          );


          doc.setTextColor(
            ...white
          );

          doc.setFont(
            "helvetica",
            "normal"
          );

          doc.setFontSize(8);

          doc.text(
            "ESTIMATED PREMIUM",
            margin + 7,
            y + 9
          );


          doc.setFont(
            "helvetica",
            "bold"
          );

          doc.setFontSize(18);

          doc.text(
            formattedPremium,
            margin + 7,
            y + 22
          );


          doc.setFont(
            "helvetica",
            "normal"
          );

          doc.setFontSize(7);

          doc.text(
            "Initial estimate • Subject to underwriting",
            pageWidth -
              margin -
              7,
            y + 17,
            {
              align:
                "right",
            }
          );


          y += 40;
        }


        /* -------------------------------------------------
           IMPORTANT NOTICE
        ------------------------------------------------- */

        if (
          y >
          pageHeight - 85
        ) {
          drawFooter();

          doc.addPage();

          y = 25;
        }


        doc.setFillColor(
          249,
          250,
          249
        );

        doc.roundedRect(
          margin,
          y,
          pageWidth -
            margin * 2,
          39,
          3,
          3,
          "F"
        );


        doc.setTextColor(
          ...primary
        );

        doc.setFont(
          "helvetica",
          "bold"
        );

        doc.setFontSize(9);

        doc.text(
          "IMPORTANT NOTICE",
          margin + 7,
          y + 9
        );


        doc.setTextColor(
          ...muted
        );

        doc.setFont(
          "helvetica",
          "normal"
        );

        doc.setFontSize(8);


        const notice =
          "This document contains an initial insurance premium estimate based on the information provided. " +
          "The final premium may change following assessment, verification and underwriting. " +
          "This estimate does not constitute a final insurance policy or binding cover.";


        const noticeLines =
          doc.splitTextToSize(
            notice,
            pageWidth -
              margin * 2 -
              14
          );


        doc.text(
          noticeLines,
          margin + 7,
          y + 17
        );


        /* -------------------------------------------------
           FOOTER
        ------------------------------------------------- */

        drawFooter();


        /* -------------------------------------------------
           DOWNLOAD
        ------------------------------------------------- */

        doc.save(
          `STALLIFS-Quote-${
            quote._id ||
            "estimate"
          }.pdf`
        );
      } catch (error) {
        console.error(
          "Quote PDF generation failed:",
          error
        );

        setError(
          "Unable to generate the PDF. Please try again."
        );
      }
    };


  /* =======================================================
     QUOTE RESULT
  ======================================================= */

  if (quote) {
    const estimatedPremium =
      Number(
        quote.estimatedPremium ||
          0
      );

    const formattedPremium =
      formatCurrency(
        estimatedPremium
      );

    const breakdown =
      quote.calculation
        ?.breakdown || {};

    const calculationData =
      buildCalculationSteps(
        quote,
        selectedCategory
      );


    return (
      <main className="quote-page">

        <section className="quote-success">

          <div className="quote-success-card">

            {/* SUCCESS ICON */}

            <div className="quote-success-icon">
              <CheckCircle2
                size={42}
                strokeWidth={1.8}
              />
            </div>


            {/* EYEBROW */}

            <span className="quote-eyebrow">
              QUOTE CALCULATED
            </span>


            {/* TITLE */}

            <h1>
              Your estimate is
              <span> ready.</span>
            </h1>


            <p>
              Thank you,{" "}
              {form.fullName}.
              Your{" "}
              {selectedProduct?.name ||
                "insurance"}{" "}
              estimate has been
              calculated.
            </p>


            {/* PREMIUM */}

            <div className="quote-estimate">

              <span className="quote-estimate-label">
                ESTIMATED PREMIUM
              </span>

              <strong className="quote-estimate-value">
                {formattedPremium}
              </strong>

              <p className="quote-estimate-note">
                This is an initial
                estimate. Your final
                premium may change
                after assessment and
                underwriting.
              </p>

            </div>


            {/* QUOTE DETAILS */}

            <div className="quote-success-status">

              <div>
                <span>
                  Product
                </span>

                <strong>
                  {quote.product
                    ?.name ||
                    selectedProduct
                      ?.name ||
                    "Insurance"}
                </strong>
              </div>


              <div>
                <span>
                  Quote ID
                </span>

                <strong>
                  {quote._id}
                </strong>
              </div>

            </div>


            {/* CALCULATION BREAKDOWN */}

            {calculationData.steps
              .length > 0 && (
              <div className="quote-breakdown">

                <div className="quote-breakdown-header">

                  <span>
                    CALCULATION
                  </span>

                  <h3>
                    How your premium was calculated
                  </h3>

                  <p>
                    Here's a transparent
                    breakdown of the
                    information and
                    pricing factors used
                    to calculate your
                    initial estimate.
                  </p>

                </div>


                <div className="quote-breakdown-list">

                  {calculationData.steps.map(
                    (
                      step,
                      index
                    ) => (
                      <div
                        key={`${step.label}-${index}`}
                        className="quote-breakdown-row"
                      >

                        <span>
                          {step.label}
                        </span>

                        <strong>
                          {step.value}
                        </strong>

                        {step.calculation && (
                          <small>
                            {
                              step.calculation
                            }
                          </small>
                        )}

                      </div>
                    )
                  )}

                </div>


                {/* MOTOR FORMULA */}

                {calculationData.calculationType ===
                  "motor" &&
                  breakdown.vehicleValue !==
                    undefined &&
                  breakdown.baseRate !==
                    undefined && (
                    <div className="quote-breakdown-formula">

                      <span>
                        CALCULATION SUMMARY
                      </span>

                      <strong>
                        {formatCurrency(
                          Number(
                            breakdown.vehicleValue
                          )
                        )}{" "}
                        ×{" "}
                        {formatRate(
                          Number(
                            breakdown.baseRate
                          )
                        )}{" "}
                        ={" "}
                        {formatCurrency(
                          breakdown.basePremium !==
                            undefined
                            ? Number(
                                breakdown.basePremium
                              )
                            : Number(
                                breakdown.vehicleValue
                              ) *
                              Number(
                                breakdown.baseRate
                              )
                        )}
                      </strong>

                      <p>
                        {breakdown.minimumPremium !==
                          undefined
                          ? Number(
                              breakdown.basePremium !==
                                undefined
                                ? breakdown.basePremium
                                : Number(
                                    breakdown.vehicleValue
                                  ) *
                                    Number(
                                      breakdown.baseRate
                                    )
                            ) >=
                            Number(
                              breakdown.minimumPremium
                            )
                            ? `The calculated base premium is above the minimum premium of ${formatCurrency(
                                Number(
                                  breakdown.minimumPremium
                                )
                              )}.`
                            : `The minimum premium of ${formatCurrency(
                                Number(
                                  breakdown.minimumPremium
                                )
                              )} applies.`
                          : "The base premium is calculated using the vehicle value and applicable premium rate."
                        }
                      </p>

                    </div>
                  )}


                {/* FINAL PREMIUM */}

                <div className="quote-breakdown-total">

                  <span>
                    ESTIMATED PREMIUM
                  </span>

                  <strong>
                    {formattedPremium}
                  </strong>

                </div>

              </div>
            )}


            {/* ACTIONS */}

            <div className="quote-success-actions">

              <Button
                size="lg"
                onClick={
                  handleDownloadQuote
                }
                rightIcon={
                  Download
                }
              >
                Download Quote
              </Button>


              <Link to="/register">

                <Button
                  variant="secondary"
                  size="lg"
                >
                  Create Account
                </Button>

              </Link>


              <Link to="/">

                <Button
                  variant="ghost"
                  size="lg"
                >
                  Back to Home
                </Button>

              </Link>

            </div>


            {/* SAVE NOTE */}

            <div className="quote-save-note">

              <ShieldCheck
                size={19}
                strokeWidth={1.8}
              />

              <p>
                Create an account to
                save this quote and
                continue with your
                insurance application.
              </p>

            </div>

          </div>

        </section>

      </main>
    );
  }


  /* =======================================================
     QUOTE FORM
  ======================================================= */

  return (
    <main className="quote-page">

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="quote-hero">

        <div className="landing-container">

          <div className="quote-hero-content">

            <span className="quote-eyebrow">
              GET A QUOTE
            </span>


            <h1>
              Find the right
              <span>
                {" "}
                protection for you.
              </span>
            </h1>


            <p>
              Tell us a little about
              yourself and we'll
              calculate an initial
              premium estimate based
              on the information you
              provide.
            </p>


            <div className="quote-trust">

              <div className="quote-trust-item">

                <ShieldCheck
                  size={20}
                  strokeWidth={1.8}
                />

                <span>
                  No login required
                </span>

              </div>


              <div className="quote-trust-item">

                <FileText
                  size={20}
                  strokeWidth={1.8}
                />

                <span>
                  Instant estimate
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* ===================================================
          FORM SECTION
      =================================================== */}

      <section className="quote-form-section">

        <div className="landing-container">

          <div className="quote-layout">

            {/* =================================================
                FORM CARD
            ================================================= */}

            <div className="quote-form-card">

              <div className="quote-form-header">

                <span className="quote-section-eyebrow">
                  YOUR DETAILS
                </span>

                <h2>
                  Calculate your quote
                </h2>

                <p>
                  Complete the information
                  below to receive an
                  estimated premium.
                </p>

              </div>


              {/* ERROR */}

              {error && (
                <div
                  className="quote-form-error"
                  role="alert"
                >
                  {error}
                </div>
              )}


              <form
                onSubmit={
                  handleSubmit
                }
                noValidate
              >

                {/* =================================================
                    PRODUCT
                ================================================= */}

                <div className="quote-field">

                  <label htmlFor="product">
                    Insurance product
                  </label>

                  <select
                    id="product"
                    name="product"
                    value={
                      form.product
                    }
                    onChange={
                      handleProductChange
                    }
                    disabled={
                      loadingProducts ||
                      submitting
                    }
                    required
                  >

                    <option value="">
                      {loadingProducts
                        ? "Loading products..."
                        : "Select an insurance product"}
                    </option>


                    {products.map(
                      (product) => (
                        <option
                          key={
                            product._id
                          }
                          value={
                            product._id
                          }
                        >
                          {
                            product.name
                          }
                        </option>
                      )
                    )}

                  </select>

                </div>


                {/* =================================================
                    PERSONAL INFORMATION
                ================================================= */}

                <div className="quote-field">

                  <label htmlFor="fullName">
                    Full name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={
                      form.fullName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                    disabled={
                      submitting
                    }
                    required
                  />

                </div>


                <div className="quote-field-row">

                  <div className="quote-field">

                    <label htmlFor="phone">
                      Phone number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={
                        form.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="0718 250 239"
                      autoComplete="tel"
                      disabled={
                        submitting
                      }
                      required
                    />

                  </div>


                  <div className="quote-field">

                    <label htmlFor="age">
                      Age
                    </label>

                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="18"
                      max="120"
                      value={
                        form.age
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Age"
                      disabled={
                        submitting
                      }
                      required
                    />

                  </div>

                </div>


                {/* =================================================
                    PRODUCT-SPECIFIC CALCULATOR
                ================================================= */}

                {selectedProduct &&
                  calculatorFields.length >
                    0 && (
                    <div className="quote-calculator">

                      <div className="quote-calculator-header">

                        <span>
                          {
                            selectedProduct.name
                          }
                        </span>

                        <h3>
                          Quote calculator
                        </h3>

                        <p>
                          Provide the
                          information
                          below so we
                          can estimate
                          your premium.
                        </p>

                      </div>


                      {calculatorFields.map(
                        (field) => (
                          <div
                            className="quote-field"
                            key={
                              field.name
                            }
                          >

                            <label
                              htmlFor={
                                field.name
                              }
                            >
                              {
                                field.label
                              }
                            </label>


                            {field.type ===
                            "select" ? (
                              <select
                                id={
                                  field.name
                                }
                                name={
                                  field.name
                                }
                                value={
                                  form[
                                    field.name
                                  ]
                                }
                                onChange={
                                  handleChange
                                }
                                disabled={
                                  submitting
                                }
                                required={
                                  field.required
                                }
                              >

                                <option value="">
                                  Select an option
                                </option>


                                {field.options.map(
                                  (
                                    option
                                  ) => (
                                    <option
                                      key={
                                        option.value
                                      }
                                      value={
                                        option.value
                                      }
                                    >
                                      {
                                        option.label
                                      }
                                    </option>
                                  )
                                )}

                              </select>
                            ) : (
                              <input
                                id={
                                  field.name
                                }
                                name={
                                  field.name
                                }
                                type={
                                  field.type
                                }
                                min="0"
                                value={
                                  form[
                                    field.name
                                  ]
                                }
                                onChange={
                                  handleChange
                                }
                                placeholder={
                                  field.placeholder
                                }
                                disabled={
                                  submitting
                                }
                                required={
                                  field.required
                                }
                              />
                            )}


                            {field.help && (
                              <span className="quote-field-help">
                                {
                                  field.help
                                }
                              </span>
                            )}

                          </div>
                        )
                      )}

                    </div>
                  )}


                {/* =================================================
                    ADDITIONAL INFORMATION
                ================================================= */}

                <div className="quote-field">

                  <label htmlFor="details">
                    Additional information
                  </label>

                  <textarea
                    id="details"
                    name="details"
                    value={
                      form.details
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Tell us anything else that may be relevant..."
                    rows={5}
                    disabled={
                      submitting
                    }
                  />

                  <span className="quote-field-help">
                    Optional — include
                    anything else you
                    would like STALLIFS
                    to know.
                  </span>

                </div>


                {/* =================================================
                    SUBMIT
                ================================================= */}

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  loading={
                    submitting
                  }
                  disabled={
                    loadingProducts ||
                    products.length === 0
                  }
                  rightIcon={
                    submitting
                      ? undefined
                      : ArrowRight
                  }
                >
                  Calculate My Quote
                </Button>

              </form>

            </div>


            {/* =================================================
                SIDE INFORMATION
            ================================================= */}

            <aside className="quote-info">

              <div className="quote-info-card">

                <div className="quote-info-icon">

                  <ShieldCheck
                    size={26}
                    strokeWidth={1.8}
                  />

                </div>


                <h3>
                  Your estimate
                </h3>


                <p>
                  The calculator
                  provides an initial
                  estimate using the
                  information you
                  provide.
                </p>


                <ul>

                  <li>
                    <CheckCircle2
                      size={18}
                    />

                    <span>
                      No login required
                    </span>
                  </li>


                  <li>
                    <CheckCircle2
                      size={18}
                    />

                    <span>
                      Instant premium
                      estimate
                    </span>
                  </li>


                  <li>
                    <CheckCircle2
                      size={18}
                    />

                    <span>
                      See how your
                      estimate is calculated
                    </span>
                  </li>


                  <li>
                    <CheckCircle2
                      size={18}
                    />

                    <span>
                      Download your
                      estimate
                    </span>
                  </li>


                  <li>
                    <CheckCircle2
                      size={18}
                    />

                    <span>
                      Register later to
                      save it
                    </span>
                  </li>

                </ul>

              </div>


              <div className="quote-help-card">

                <span>
                  ALREADY HAVE AN ACCOUNT?
                </span>


                <p>
                  Log in to manage your
                  existing quotes,
                  applications and
                  policies.
                </p>


                <Link to="/login">

                  Login to STALLIFS

                  <ArrowRight
                    size={16}
                  />

                </Link>

              </div>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}