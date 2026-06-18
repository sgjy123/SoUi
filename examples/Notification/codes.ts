// examples/Notification/codes.ts

export const basicCode = `<Button onClick={() => Notification.success({ message: 'Success', description: 'This is a success notification.' })}>
  Success
</Button>`;

export const placementCode = `<Button onClick={() => Notification.open({ 
  message: 'Placement topRight', 
  description: 'This notification appears in the top right.',
  placement: 'topRight'
})}>
  Top Right
</Button>`;
