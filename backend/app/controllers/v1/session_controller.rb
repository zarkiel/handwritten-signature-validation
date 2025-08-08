class V1::SessionController < ApplicationController
    before_action :check_session_token

    def initial_state
        state = {
            role: @Role.json,
            worker: {**@User.worker.session_json, photo: get_photo(@User.worker.photo)},
            pages: []
        }

        ok(state)
    end
end



