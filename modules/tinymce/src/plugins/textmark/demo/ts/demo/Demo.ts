declare let tinymce: any;

tinymce.init({
  selector: 'textarea.tinymce',
  plugins: 'textmark code help',
  toolbar: 'textmark untextmark code',
  menubar: 'view insert tools custom help',
  text_mark_type_list: [
    {title: '时间选择器', value: 'datetime'},
    {title: '文本输入框', value: 'textbox'}
  ],
  menu: {
    custom: { title: 'FIND', items: 'textmark untextmark' }
  },
  height: 600,
  setup: (editor) => {
    editor.on('init', () => {
      editor.setContent('<h1>Heading</h1><p><a name="anchor1"></a>anchor here.');
    });
    editor.on('change', (e) => {
      // const newContent = editor.getContent();
    });
  }
});

export {};
