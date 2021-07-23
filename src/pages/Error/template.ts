// eslint-disable-next-line import/no-default-export
export default `
<main class="error">
    <div class="error__inner">
        <%~ it.slots?.errNum.outerHTML %>
        <%~ it.slots?.errMessage.outerHTML %>
        <%~ it.slots?.linkBack.outerHTML %>
    </div>
</main>
`;
