<script>
  import Card from "./Card.svelte";
  import Text from "./Text.svelte";
  import VBox from "./VBox.svelte";

  let { title = "Card Title", body = "Card body content.", ...rest } = $props();
</script>

<Card {...rest}>
  <VBox spacing={8}>
    <Text fontWeight={600}>{title}</Text>
    <Text>{body}</Text>
  </VBox>
</Card>
