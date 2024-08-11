<script setup lang="ts">
import { onMounted, ref } from "vue";
import TicketForm from "./components/Form/TicketForm.vue";
import TicketService from "./services/ticket.service";
import { FilterMatchMode } from '@primevue/core/api';

const tickets = ref([]);
const getTickets = async () => {
  const respTickets = await TicketService.filterTickets();
  tickets.value = respTickets;
};

const createTicket = async (values: any) => {
  await TicketService.createTicket(values);
  await getTickets();
};

const updateTicket = async (id: string, values: any) => {
  await TicketService.updateTicket(id, values);
  await getTickets();
};

const statusOptions = [
  {
    name: 'pending',
  },
  {
    name: 'accepted',
  },
  {
    name: 'resolved',
  },
  {
    name: 'rejected',
  },
]

const filters = ref({
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
});

const updateStatus = async (id: string, status: string) => {
  await updateTicket(id, { status })
  await getTickets();
}
onMounted(async () => {
  await getTickets();
});
</script>

<template>
  <div class="my-12 md:my-32 mx-4 md:mx-16">
    <div class="flex justify-between mb-8">
      <span class="font-bold text-2xl">Tickets</span>
      <TicketForm
        mode="create"
        label="Create Ticket"
        @submit="(values) => createTicket(values)"
      />
    </div>

    <DataTable v-model:filters="filters" :showFilterMenu="false" paginator :rows="20" :rowsPerPageOptions="[5, 10, 20, 50]" :value="tickets" 
    tableStyle="min-width: 50rem" filterDisplay="row" :globalFilterFields="['status']">
      <Column field="title" sortable header="Title"></Column>
      <Column field="description" sortable header="Description"></Column>
      <Column field="contact" sortable header="Contact"></Column>
      <Column header="Status" field="status" sortable>
        <template #body="slotProps">
          <Select v-model="slotProps.data.status" @change="(status) => updateStatus(slotProps.data.id, status.value)" :options="statusOptions" optionValue="name" optionLabel="name" placeholder="Select a Status" checkmark :highlightOnSelect="false" class="w-full" />
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <Select v-model="filterModel.value" @change="filterCallback()" :options="statusOptions" optionValue="name" optionLabel="name" placeholder="Select a Status" checkmark :highlightOnSelect="false" class="w-full" />
      </template>
      </Column>
      <Column header="Action" field="status">
        <template #body="slotProps">
          <TicketForm
            label="Update Ticket"
            mode="edit"
            :defaultData="slotProps.data"
            @submit="(values) => updateTicket(slotProps.data.id, values)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped></style>
