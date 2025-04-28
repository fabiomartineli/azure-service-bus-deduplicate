resource "azurerm_servicebus_namespace" "servicebus_deduplicate" {
  name                = "servicebus-deduplicate"
  location            = var.region
  resource_group_name = var.resource_group
  sku                 = "Standard"
}

resource "azurerm_servicebus_namespace_authorization_rule" "servicebus_deduplicate" {
  name         = "application-rule"
  namespace_id = azurerm_servicebus_namespace.servicebus_deduplicate.id
  listen       = true
  send         = true
  manage       = false
}


resource "azurerm_servicebus_queue" "deduplicate" {
  name                                    = "deduplicate"
  namespace_id                            = azurerm_servicebus_namespace.servicebus_deduplicate.id
  max_delivery_count                      = 2
  requires_duplicate_detection            = true
  duplicate_detection_history_time_window = "PT5M"
  lock_duration                           = "PT1M"
}
