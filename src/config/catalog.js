export const WIDGET_CATALOG = {
  tabs: [
    {
      id: "CSPM",
      label: "CSPM",
      widgets: [
        {
          id: "cspm-1",
          title: "Cloud Accounts",
          type: "donut",
          default: true,
          data: [
            { name: "Connected", value: 62 },
            { name: "Not Connected", value: 38 }
          ],
          description: "Cloud accounts connection status"
        },
        {
          id: "cspm-2",
          title: "Cloud Account Risk Assessment",
          type: "donut",
          default: true,
          data: [
            { name: "Failed", value: 1689 },
            { name: "Warning", value: 681 },
            { name: "Not Available", value: 36 },
            { name: "Passed", value: 7253 }
          ],
          description: "Risk distribution across cloud accounts"
        }
      ]
    },
    {
      id: "CWPP",
      label: "CWPP",
      widgets: [
        {
          id: "cwpp-1",
          title: "Top 5 Namespace Specific Alerts",
          type: "list",
          default: true,
          data: [
            { name: "kube-system", value: 42 },
            { name: "payments", value: 35 },
            { name: "auth", value: 19 },
            { name: "search", value: 12 },
            { name: "default", value: 9 }
          ],
          description: "Most alerting namespaces by count"
        },
        {
          id: "cwpp-2",
          title: "Workload Alerts",
          type: "list",
          default: true,
          data: [
            { name: "nginx-deploy", value: 21 },
            { name: "api-gateway", value: 17 },
            { name: "worker-queue", value: 10 },
            { name: "cron-backup", value: 7 },
            { name: "mail-service", value: 3 }
          ],
          description: "Workloads with highest alert counts"
        }
      ]
    },
    {
      id: "Image",
      label: "Image",
      widgets: [
        {
          id: "img-1",
          title: "Image Risk Assessment",
          type: "stacked-progress",
          default: true,
          data: [
            { name: "Critical", value: 9, color: "#EF4444" },
    { name: "High", value: 150, color: "#F59E0B" },
    { name: "Medium", value: 500, color: "#3B82F6" },
    { name: "Low", value: 811, color: "#10B981" }
          ],
          description: "Risk breakdown across images"
        },
        {
          id: "img-2",
          title: "Image Security Issues",
          type: "stacked-progress",
          default: true,
          data: [
            { name: "Secrets", value: 30, color: "#EF4444" },
            { name: "Vulns", value: 420, color: "#F59E0B" },
            { name: "Misconfig", value: 88, color: "#3B82F6" },
            { name: "Malware", value: 6, color: "#10B981" }
          ],
          description: "Top issue categories found in images"
        },
      ]
    },
    {
      id: "Ticket",
      label: "Ticket",
      widgets: [
        {
          id: "tkt-1",
          title: "Open Tickets",
          type: "kpi",
          default: true,
          data: { value: 37, trend: "+5 this week" },
          description: "Currently open tickets from integrations"
        }
      ]
    }
  ]
};

export const WIDGET_INDEX = (() => {
  const map = new Map();
  for (const tab of WIDGET_CATALOG.tabs) {
    for (const w of tab.widgets) map.set(w.id, { ...w, tabId: tab.id });
  }
  return map;
})();
