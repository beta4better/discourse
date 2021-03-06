import { ajax } from 'discourse/lib/ajax';
import { popupAjaxError } from 'discourse/lib/ajax-error';

export default Discourse.Route.extend({
  model() {
    return ajax('/tags/personal_messages').then(result => {
      return result.tags.map(tag => Ember.Object.create(tag));
    }).catch(popupAjaxError);
  },

  titleToken() {
    return [I18n.t("tagging.tags"), I18n.t("user.private_messages")];
  },

  setupController(controller, model) {
    this.controllerFor('user-private-messages-tags').setProperties({
      model,
      sortProperties: this.siteSettings.tags_sort_alphabetically ? ['id'] : ['count:desc', 'id']
    });
    this.controllerFor("user-private-messages").set("showToggleBulkSelect", false);
  }
});
