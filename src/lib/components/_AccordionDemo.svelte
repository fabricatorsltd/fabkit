<script>
  import Accordion from "./Accordion.svelte";
  import AccordionItem from "./AccordionItem.svelte";
</script>

<Accordion>
  <AccordionItem title="What is fabkit?">
    A lightweight Svelte 5 component library for building modern desktop-style web apps.
  </AccordionItem>
  <AccordionItem title="How do I install it?">
    Run <code>npm install @fabricatorsltd/fabkit</code> and import the components you need.
  </AccordionItem>
  <AccordionItem title="Is it SSR compatible?">
    Yes — all components guard against server-side rendering with <code>typeof document</code> checks.
  </AccordionItem>
</Accordion>
